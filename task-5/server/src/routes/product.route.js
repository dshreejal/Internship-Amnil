const express = require("express");
const
    {
        getProducts,
        getOneProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        getOutOfStock,
        updateProductQuantity,
    } = require("../modules/Product/product.controller");

const router = express.Router();

const imageUpload = require("../helpers/imageUpload");

router.route('/')
    .get(getProducts)
    .post(imageUpload.single('image'), createProduct)

router.route('/out-of-stock')
    .get(getOutOfStock)

router.route('/:id')
    .get(getOneProduct)
    .put(imageUpload.single('image'), updateProduct)
    .delete(deleteProduct)

router.route('/update-quantity/:id')
    .patch(updateProductQuantity)


module.exports = router;