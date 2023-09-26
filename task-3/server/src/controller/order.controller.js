const orders = require("../data/orders.json")
const cart = require("../data/cart.json")
const products = require("../data/products.json")

const fs = require("fs");
const path = require("path");

const pathToOrders = path.join(__dirname, "../data/orders.json");
const pathToCart = path.join(__dirname, "../data/cart.json");


exports.getOrders = (req, res) => {
    res.status(200).send(orders);
}

exports.getOneOrder = (req, res) => {
    const order = orders.find(order => order.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).send('Order not found');
    }
    res.status(200).send(order);
}

exports.addToCart = (req, res) => {
    const newCart = req.body;
    const cartAlreadyPresent = cart.find(cart => cart.user_id === req.body.user_id);

    //if cart already present, update the cart else create a new cart
    if (cartAlreadyPresent) {
        const presentIndex = cart.indexOf(cartAlreadyPresent);

        // Loop through items in the newCart and update quantity or add new items
        newCart.items.forEach((item) => {
            const existingItemIndex = cartAlreadyPresent.items.findIndex((t) => t.id === item.id);

            if (existingItemIndex !== -1) {
                // Item already exists, update its quantity
                cartAlreadyPresent.items[existingItemIndex].quantity += item.quantity;
            } else {
                // Item doesn't exist, add it to the cart
                cartAlreadyPresent.items.push(item);
            }
        });

        //calculating the total price of the products in the cart
        cartAlreadyPresent.total_price = (cartAlreadyPresent.items.reduce((acc, item) => {
            const product = products.find(product => product.id === item.id);
            return acc + (product.price * item.quantity);
        }, 0)).toFixed(2);


        cart[presentIndex] = cartAlreadyPresent;

        fs.writeFile(pathToCart, JSON.stringify(cart, null, 2), 'utf8', (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal server error');
            }
            return res.status(200).send(cartAlreadyPresent);
        })
    }
    else {
        cart.push(newCart);

        const index = cart.indexOf(newCart);
        const userCart = cart[index];

        //calculating the total price of the products in the cart
        userCart.total_price = (userCart.items.reduce((acc, item) => {
            const product = products.find(product => product.id === item.id);
            return acc + (product.price * item.quantity);
        }, 0)).toFixed(2);

        cart[index] = userCart;

        fs.writeFile(pathToCart, JSON.stringify(cart, null, 2), 'utf8', (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal server error');
            }
            res.status(201).send(newCart);
        })
    }
}

exports.checkout = (req, res) => {
    const userId = parseInt(req.params.userId);
    const cartId = parseInt(req.params.cartId);

    const userCart = cart.find(cart => cart.user_id === userId);
    if (!userCart) {
        return res.status(404).send('Cart not found');
    }

    if (userCart.is_ordered) {
        return res.status(400).send('Cart already ordered');
    }

    if (userCart.total_price < 1000) {
        return res.status(400).send('Minimum threshold for total price of an order is 1000');
    }

    const index = cart.indexOf(userCart);
    cart.splice(index, 1);

    const newOrder = {
        id: orders.length + 1,
        user_id: userId,
        cart_id: cartId,
        items: userCart.items,
        total_price: userCart.total_price,
        order_status: "pending",
        order_date: new Date().toISOString().slice(0, 10)
    }

    orders.push(newOrder);

    fs.writeFile(pathToOrders, JSON.stringify(orders, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }

        fs.writeFile(pathToCart, JSON.stringify(cart, null, 2), 'utf8', (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal server error');
            }
            res.status(201).send(newOrder);
        })
    })
}

