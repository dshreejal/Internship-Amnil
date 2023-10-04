const express = require('express');
const router = express.Router();

const userRouter = require("./user.route");
const produtRouter = require("./product.route");
const orderRouter = require("./order.route");
const storeRouter = require("./store.route");

router.use("/api/users", userRouter);
router.use("/api/products", produtRouter);
router.use("/api/orders", orderRouter);
router.use("/api/store", storeRouter);

module.exports = router;