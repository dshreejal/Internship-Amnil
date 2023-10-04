
const Product = require("../../models/Product.model");
const Store = require("../../models/Store.model");
const { getImageUrl } = require("../../helpers/getImageUrl");

exports.getProducts = async (req, res) => {
    const { name, description, sort, filter } = req.query;

    let filterObject = {};
    if (name) {
        filterObject.name = { $regex: name, $options: "i" };
    }
    if (description) {
        filterObject.description = { $regex: description, $options: "i" };
    }
    if (filter) {
        filterObject.product_type = { $regex: filter, $options: "i" }
    }


    let sortObject = {};
    if (sort) {
        if (sort === "price") {
            sortObject.price = 1;
        }
        else if (sort === "-price") {
            sortObject.price = -1;
        }
    }

    const products = await Product.find(filterObject).sort(sortObject).populate({
        path: "store",
        select: "name location"
    });

    products.forEach((product) => {
        product.image = getImageUrl(req, product.image);
    });

    res.status(200).send(products);
}

exports.getOneProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    product.image = getImageUrl(req, product.image);
    res.status(200).send(product);
}

exports.getOutOfStock = async (req, res) => {
    const outOfStockProducts = await Product.find({ quantity: { $lt: 5 } });
    outOfStockProducts.forEach((product) => {
        product.image = getImageUrl(req, product.image);
    });
    res.status(200).send(outOfStockProducts);
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

    const store = await Store.findById(req.body.storeId);
    if (!store) {
        return res.status(404).send('Store not found');
    }

    const productAlreadyPresent = await Product.findOne({ name: req.body.name });
    if (productAlreadyPresent) {
        return res.status(400).send('Product already present');
    }

    const product = await Product.create(newProduct);
    product.image = getImageUrl(req, product.image);

    await Store.findByIdAndUpdate(req.body.storeId, { $push: { products: product._id } });

    res.status(201).send(product);

}

exports.updateProduct = async (req, res) => {
    const product = Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send('Product not found');
    }

    let file;
    if (req.file) {
        file = req.file.filename;
    }

    const updateProduct = {
        store: product.store,
        name: req.body.name || product.name,
        price: req.body.price || product.price,
        description: req.body.description || product.description,
        quantity: req.body.quantity || product.quantity,
        product_type: req.body.product_type || product.product_type,
        image: file || product.image
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateProduct, { new: true })
    updatedProduct.image = getImageUrl(req, updatedProduct.image);

    res.status(200).send(updatedProduct);

}

exports.updateProductQuantity = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send('Product not found');
    }

    const updateProduct = {
        quantity: req.body.quantity || product.quantity
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateProduct, { new: true })
    updatedProduct.image = getImageUrl(req, updatedProduct.image);

    res.status(200).send(updatedProduct);

}

exports.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send('Product not found');
    }

    await Product.findByIdAndDelete(req.params.id);

    //also delete product id from store
    await Store.findByIdAndUpdate(product.store, { $pull: { products: product_id } });

    res.status(200).send("product deleted successfully");

}