const express = require('express');
const router = express.Router();

const userRouter = require("./user.route");
const produtRouter = require("./product.route");
const orderRouter = require("./order.route");
const storeRouter = require("./store.route");
const authRouter = require("./auth.route");

const JwtAuthenticationMiddleware = require('../middlewares/JwtAuthentication.middleware');

router.use("/auth", authRouter);

router.use("/users", userRouter);
router.use("/products", produtRouter);

//authentication middleware
router.use(JwtAuthenticationMiddleware)


router.use("/orders", orderRouter);
router.use("/store", storeRouter);

module.exports = router;