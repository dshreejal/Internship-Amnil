const express = require('express');
const router = express.Router();

const userRouter = require("./user.route");
const produtRouter = require("./product.route");
const orderRouter = require("./order.route");
const storeRouter = require("./store.route");
const authRouter = require("./auth.route");

const JwtAuthenticationMiddleware = require('../middlewares/JwtAuthentication.middleware');

router.use("/api/auth", authRouter);

router.use("/api/users", userRouter);
router.use("/api/products", produtRouter);

//authentication middleware
router.use(JwtAuthenticationMiddleware)


router.use("/api/orders", orderRouter);
router.use("/api/store", storeRouter);

module.exports = router;