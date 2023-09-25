const express = require("express");
const { getProducts, getOneProduct, createProduct, updateProduct, deleteProduct, getOutOfStock, updateProductQuantity } = require("../controller/product.controller");
const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(createProduct)

router.route('/out-of-stock')
    .get(getOutOfStock)

router.route('/:id')
    .get(getOneProduct)
    .put(updateProduct)
    .delete(deleteProduct)

router.route('/update-quantity/:id')
    .patch(updateProductQuantity)


module.exports = router;