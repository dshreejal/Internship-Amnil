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

const JwtAuthenticationMiddleware = require("../middlewares/JwtAuthentication.middleware");

//Public routes
router.route('/')
    .get(getProducts)

router.route('/:id')
    .get(getOneProduct)

//authentication middleware
router.use(JwtAuthenticationMiddleware)

//Protected Routes
router.route('/')
    .post(imageUpload.single('image'), createProduct)

router.route('/out-of-stock')
    .get(getOutOfStock)

router.route('/:id')
    .put(imageUpload.single('image'), updateProduct)
    .delete(deleteProduct)

router.route('/update-quantity/:id')
    .patch(updateProductQuantity)


module.exports = router;