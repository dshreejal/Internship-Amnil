const pool = require('../../config/db')
const { getImageUrl } = require("../../helpers/getImageUrl");

exports.getProducts = async (req, res) => {
    const { name, description, sort, filter } = req.query;

    let filterConditions = [];
    let queryParams = [];

    if (name) {
        filterConditions.push("name ILIKE $1");
        queryParams.push(`%${name}%`);
    }

    if (description) {
        filterConditions.push("description ILIKE $2");
        queryParams.push(`%${description}%`);
    }

    if (filter) {
        filterConditions.push("product_type ILIKE $3");
        queryParams.push(`%${filter}%`);
    }

    let sortQuery = "";
    if (sort) {
        if (sort === "price") {
            sortQuery = "ORDER BY price ASC";
        } else if (sort === "-price") {
            sortQuery = "ORDER BY price DESC";
        }
    }
    else {
        sortQuery = "ORDER BY id ASC";
    }

    const query = `
        SELECT * FROM products
        ${filterConditions.length > 0 ? 'WHERE ' + filterConditions.join(' AND ') : ''}
        ${sortQuery}
    `;

    const result = await pool.query(query, queryParams);

    const products = result.rows;

    products.forEach((product) => {
        product.image = getImageUrl(req, product.image);
    });

    res.status(200).send(products);
}

exports.getOneProduct = async (req, res) => {
    const product = await pool.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    if (product.rowCount === 0) {
        return res.status(404).send('Product not found');
    }
    product.rows[0].image = getImageUrl(req, product.rows[0].image);
    res.status(200).send(product.rows[0]);
}

exports.getOutOfStock = async (req, res) => {
    const outOfStockProducts = await pool.query('SELECT * FROM products WHERE quantity < 5');
    if (outOfStockProducts.rowCount === 0) {
        return res.status(404).send('No products out of stock');
    }
    const products = outOfStockProducts.rows;
    products.forEach((product) => {
        product.image = getImageUrl(req, product.image);
    });
    return res.status(200).send(products);
}

exports.createProduct = async (req, res) => {
    const file = req.file.filename;

    const newProduct = {
        store: req.body.storeId,
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        quantity: parseInt(req.body.quantity),
        product_type: req.body.product_type,
        image: file
    }

    // const store = await Store.findById(req.body.storeId);
    // if (!store) {
    //     return res.status(404).send('Store not found');
    // }

    const productAlreadyPresent = await pool.query('SELECT * FROM products WHERE name=$1', [newProduct.name])
    if (productAlreadyPresent.rowCount !== 0) {
        return res.status(400).send('Product already present');
    }

    const product = await pool.query('INSERT INTO products (name, price, description, quantity, product_type, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [newProduct.name, newProduct.price, newProduct.description, newProduct.quantity, newProduct.product_type, newProduct.image]);

    product.rows[0].image = getImageUrl(req, product.rows[0].image);

    // await Store.findByIdAndUpdate(req.body.storeId, { $push: { products: product._id } });

    res.status(201).send(product.rows[0]);

}

exports.updateProduct = async (req, res) => {
    const product = await pool.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    if (product.rowCount === 0) {
        return res.status(404).send('Product not found');
    }

    let file;
    if (req.file) {
        file = req.file.filename;
    }

    const updateProduct = {
        // store: product.store,
        name: req.body.name || product.rows[0].name,
        price: req.body.price || product.rows[0].price,
        description: req.body.description || product.rows[0].description,
        quantity: req.body.quantity || product.rows[0].quantity,
        product_type: req.body.product_type || product.rows[0].product_type,
        image: file || product.rows[0].image
    }

    const result = await pool.query('UPDATE products SET name=$1, price=$2, description=$3, quantity=$4, product_type=$5, image=$6 WHERE id=$7 RETURNING *', [updateProduct.name, updateProduct.price, updateProduct.description, updateProduct.quantity, updateProduct.product_type, updateProduct.image, req.params.id]);

    result.rows[0].image = getImageUrl(req, result.rows[0].image);

    res.status(200).send(result.rows[0]);

}

exports.updateProductQuantity = async (req, res) => {
    const product = await pool.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    if (product.rowCount === 0) {
        return res.status(404).send('Product not found');
    }

    const updateProduct = {
        quantity: req.body.quantity || product.rows[0].quantity
    }

    const updatedProduct = await pool.query('UPDATE products SET quantity=$1 WHERE id=$2 RETURNING *', [updateProduct.quantity, req.params.id]);

    updatedProduct.rows[0].image = getImageUrl(req, updatedProduct.rows[0].image);

    res.status(200).send(updatedProduct.rows[0]);

}

exports.deleteProduct = async (req, res) => {
    const product = await pool.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    if (product.rowCount === 0) {
        return res.status(404).send('Product not found');
    }

    await pool.query('DELETE FROM products WHERE id=$1', [req.params.id]);

    // await Store.findByIdAndUpdate(product.store, { $pull: { products: product._id } });

    res.status(200).send("product deleted successfully");

}