const pool = require("../../config/db");
const transporter = require("../../helpers/nodeMailer");
const fs = require('fs');
const path = require('path');
const mjml = require('mjml');
const ejs = require('ejs');


exports.getOrders = async (req, res) => {
    const getOrder = await pool.query('SELECT * FROM orders');

    if (getOrder.rowCount === 0) {
        return res.status(404).send('Order not found');
    }

    for (const order of getOrder.rows) {
        const orderProductQuery = `
                SELECT op.*, p.name, p.price
                FROM order_products AS op
                JOIN products AS p ON op.product_id = p.id
                WHERE op.order_id = $1
            `;
        const orderProduct = await pool.query(orderProductQuery, [order.id]);
        order.products = orderProduct.rows;
    }

    res.send(getOrder.rows);

}

exports.getOneOrder = async (req, res) => {
    const order = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
    if (order.rowCount === 0) {
        return res.status(404).send('Order not found');
    }

    const orderProductQuery = `
        SELECT op.*, p.name, p.price
        FROM order_products AS op
        JOIN products AS p ON op.product_id = p.id
        WHERE op.order_id = $1
    `;
    const orderProduct = await pool.query(orderProductQuery, [order.rows[0].id]);
    res.send(orderProduct.rows);
}

exports.viewCart = async (req, res) => {
    const userId = parseInt(req.params.id);
    const cartQuery = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    if (cartQuery.rowCount === 0) {
        return res.status(404).send('Cart not found');
    }
    const cart = cartQuery.rows[0];
    const cartId = cart.id;

    const cartProductsQuery = await pool.query('SELECT cp.quantity, cp.price, p.name FROM cart_products cp JOIN products p ON cp.product_id = p.id WHERE cp.cart_id = $1', [cartId]);

    cart.cartProducts = cartProductsQuery.rows;

    res.status(200).send(cart);
}

exports.addToCart = async (req, res) => {
    const newCart = req.body;

    const userId = parseInt(req.body.user);

    const userExistsResult = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userExistsResult.rowCount === 0) {
        return res.status(404).send('User not found');
    }

    const cartExistsResult = await pool.query("SELECT * FROM carts WHERE user_id = $1", [userId]);

    if (cartExistsResult.rowCount > 0) {
        const cartId = cartExistsResult.rows[0].id;

        const productsResult = await pool.query('SELECT * FROM cart_products WHERE cart_id = $1', [cartId]);

        const existingProducts = productsResult.rows;
        const newProducts = newCart.products;

        for (const newProduct of newProducts) {
            // Check if the product exists in the Products table
            const productDetailsResult = await pool.query('SELECT * FROM products WHERE id = $1', [newProduct.product]);
            if (productDetailsResult.rowCount === 0) {
                return res.status(404).send('Product not found');
            }

            const productDetails = productDetailsResult.rows[0];

            // Check if the product quantity is greater than 0
            if (productDetails.quantity <= 0) {
                return res.status(400).send('Product quantity is not available');
            }

            const existingProduct = existingProducts.find((product) => product.product_id === parseInt(newProduct.product));

            if (existingProduct) {
                // Product already exists in the cart, update quantity and price
                existingProduct.quantity += newProduct.quantity;

                // Calculate the new price based on the updated quantity and the latest price
                existingProduct.price = existingProduct.quantity * productDetails.price;

                // Update the existing product in the cart_products table
                await pool.query('UPDATE cart_products SET quantity = $1, price = $2 WHERE cart_id = $3 AND product_id = $4', [existingProduct.quantity, existingProduct.price, cartId, newProduct.product]);
            } else {
                // Product is not in the cart Calculate the price for the new product based on the products table
                const newPrice = newProduct.quantity * productDetails.price;
                const insertProductQuery = 'INSERT INTO cart_products (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)';
                await pool.query(insertProductQuery, [cartId, newProduct.product, newProduct.quantity, newPrice]);
            }
        }
        const updatedTotalPriceQuery = 'SELECT SUM(price) AS total_price FROM cart_products WHERE cart_id = $1';
        const updatedTotalPriceResult = await pool.query(updatedTotalPriceQuery, [cartId]);

        const updatedTotalPrice = updatedTotalPriceResult.rows[0].total_price;

        const updateCartQuery = 'UPDATE carts SET total_price = $1 WHERE id = $2';
        await pool.query(updateCartQuery, [updatedTotalPrice, cartId]);

        res.send('Cart updated successfully');
    }
    else {
        const newProducts = newCart.products;
        let total_price = 0;

        const insertCartResult = await pool.query('INSERT INTO carts (user_id, total_price) VALUES ($1, $2) RETURNING id', [userId, total_price]);

        for (const newProduct of newProducts) {
            // Check if the product exists in the Products Table
            const productDetailsResult = await pool.query('SELECT * FROM products WHERE id = $1', [newProduct.product]);
            if (productDetailsResult.rowCount === 0) {
                return res.status(404).send('Product not found');
            }
            const productDetails = productDetailsResult.rows[0];

            // Check if the product quantity is greater than 0
            if (productDetails.quantity <= 0) {
                return res.status(400).send('Product quantity is not available');
            }

            // Calculate the price for the new product based on the products table
            const newPrice = newProduct.quantity * productDetails.price;
            total_price += newPrice;


            // Insert the product into the cart_products table
            await pool.query('INSERT INTO cart_products (cart_id, product_id, quantity, price) VALUES ( $1, $2, $3, $4)', [insertCartResult.rows[0].id, newProduct.product, newProduct.quantity, newPrice]);
        }

        const CartResult = await pool.query('UPDATE carts SET total_price = $1 WHERE user_id = $2 RETURNING *', [total_price, userId]);

        const newCartId = CartResult.rows[0].id;
        res.send('New cart created with ID: ' + newCartId);
    }

}

exports.checkout = async (req, res) => {
    const userId = req.params.userId;
    const cartId = req.params.cartId;

    const userCartResult = await pool.query('SELECT * FROM carts WHERE user_id = $1 AND id = $2', [userId, cartId])
    if (userCartResult.rowCount === 0) {
        return res.status(404).send('Cart not found');
    }

    const userCart = userCartResult.rows[0];

    const cartProductsQuery = await pool.query('SELECT cp.quantity, cp.price, p.id, p.name FROM cart_products cp JOIN products p ON cp.product_id = p.id WHERE cp.cart_id = $1', [userCart.id]);

    userCart.products = cartProductsQuery.rows;

    if (userCart.total_price < 1000) {
        return res.status(400).send('Minimum threshold for total price of an order is 1000');
    }

    const order = await pool.query('INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *', [userId, userCart.total_price]);
    const orderId = order.rows[0].id;

    for (const product of userCart.products) {

        const productDetailsResult = await pool.query('SELECT * FROM products WHERE id = $1', [product.id]);
        if (productDetailsResult.rowCount === 0) {
            return res.status(404).send('Product not found');
        }

        const productDetails = productDetailsResult.rows[0];


        if (productDetails) {
            productDetails.quantity -= product.quantity;
            if (productDetails.quantity < 0) {
                return res.status(400).send('Product quantity is not available');
            }
            await pool.query('UPDATE products SET quantity = $1 WHERE id = $2', [productDetails.quantity, product.id]);

            await pool.query('INSERT INTO order_products (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)', [orderId, product.id, product.quantity, product.price]);
        }
        else {
            return res.status(404).send('Product not found');
        }
    }


    await pool.query('UPDATE orders SET total_price=$1 where id = $2', [userCart.total_price, orderId,]);

    const getOrder = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    const orderDetailsQuery = `
        SELECT op.*, p.name, p.price
        FROM order_products AS op
        JOIN products AS p ON op.product_id = p.id
        WHERE op.order_id = $1
    `;
    const orderDetails = await pool.query(orderDetailsQuery, [order.rows[0].id]);

    const displayData = getOrder.rows[0];
    displayData.products = orderDetails.rows;

    await pool.query('DELETE FROM cart_products WHERE cart_id = $1', [userCart.id]);
    await pool.query('DELETE FROM carts WHERE id = $1', [userCart.id]);

    const mjmlTemplate = fs.readFileSync(path.resolve(__dirname, '../../helpers/mailTemplates/Invoice.mjml'), 'utf8')

    const template = ejs.compile(mjmlTemplate);
    const mjmlContent = template(displayData);

    const { html } = mjml(mjmlContent);

    const info = await transporter.sendMail({
        from: `"Ecommerce Backend" <${process.env.smtpUserEmail}>`,
        to: req.user.email || "cassandra.kuhic@ethereal.email",
        subject: "Invoice",
        html: html,
    });

    res.send(displayData)
}

exports.aggregatedOrder = async (req, res) => {
    const query = `
    SELECT
      EXTRACT(MONTH FROM created_at) AS month,
      EXTRACT(DAY FROM created_at) AS day,
      EXTRACT(YEAR FROM created_at) AS year,
      COUNT(*) AS total_orders,
      SUM(total_price) AS total_price
    FROM orders
    GROUP BY year, month, day
    ORDER BY year, month, day;
  `;

    const result = await pool.query(query);

    if (result.rowCount === 0) {
        return res.status(404).send('No orders found');
    }

    res.send(result.rows);

}