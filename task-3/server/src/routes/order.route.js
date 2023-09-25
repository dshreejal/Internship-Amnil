const express = require("express");
const { addToCart, getOrders, checkout, getOneOrder } = require("../controller/order.controller");

const router = express.Router();

router.route('/')
    .get(getOrders);

router.route('/:id')
    .get(getOneOrder);

router.route('/add-to-cart')
    .post(addToCart);

router.route('/checkout/:userId/:cartId')
    .post(checkout);

module.exports = router;