const express = require("express");
const { getProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require("../controller/product.controller");
const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(createProduct)

router.route('/:id')
    .get(getOneProduct)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = router;