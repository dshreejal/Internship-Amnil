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

router.route('/statistics/byDate/:date?').get(getStatisticsByDate)

router.route('/statistics/totalRevenew/:startDate?/:endDate?').get(getTotalRevenew)

router.route('/statistics/topSoldProducts/:startDate?/:endDate?').get(getTopSoldProducts)

module.exports = router;