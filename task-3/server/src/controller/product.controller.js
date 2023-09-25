const products = require("../data/products.json")
const fs = require("fs");
const path = require("path");

const pathToProducts = path.join(__dirname, "../data/products.json");

exports.getProducts = (req, res) => {
    res.status(200).send(products);
}

exports.getOneProduct = (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.status(200).send(product);
}

exports.getOutOfStock = (req, res) => {
    const outOfStockProducts = products.filter(product => product.quantity < 5);
    res.status(200).send(outOfStockProducts);
}

exports.createProduct = (req, res) => {
    const newProduct = req.body;

    const productAlreadyPresent = products.find(product => product.name === req.body.name);
    if (productAlreadyPresent) {
        return res.status(400).send('Product already present');
    }

    products.push(newProduct);
    fs.writeFile(pathToProducts, JSON.stringify(products, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        res.status(201).send(newProduct);
    })
}

exports.updateProduct = (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('Product not found');
    }

    const updateProduct = {
        id: product.id,
        name: req.body.name || product.name,
        price: req.body.price || product.price,
        description: req.body.description || product.description,
        quantity: req.body.quantity || product.quantity,
        product_type: req.body.product_type || product.product_type
    }

    const index = products.indexOf(product);
    products[index] = updateProduct;

    fs.writeFile(pathToProducts, JSON.stringify(products, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send(updateProduct);
    })
}

exports.updateProductQuantity = (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('Product not found');
    }

    const index = products.indexOf(product);
    products[index].quantity = req.body.quantity || product.quantity;

    fs.writeFile(pathToProducts, JSON.stringify(products, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send(products[index]);
    })
}

exports.deleteProduct = (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('Product not found');
    }

    const index = products.indexOf(product);
    products.splice(index, 1);

    fs.writeFile(pathToProducts, JSON.stringify(products, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send("product deleted successfully");
    })
}