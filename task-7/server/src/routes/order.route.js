const express = require("express");
const { addToCart, getOrders, getOneOrder, viewCart, checkout, getStatisticsByDate, getTotalRevenew, getTopSoldProducts } = require("../modules/Order/order.controller");

const router = express.Router();

router.route('/')
    .get(getOrders);

router.route('/:id')
    .get(getOneOrder);

router.route('/add-to-cart')
    .post(addToCart);

router.route('/view-cart/:id').get(viewCart)

router.route('/checkout/:userId/:cartId')
    .post(checkout);

router.route('/statistics/byDate').get(getStatisticsByDate)

router.route('/statistics/totalRevenew').get(getTotalRevenew)

router.route('/statistics/topSoldProducts').get(getTopSoldProducts)

module.exports = router;