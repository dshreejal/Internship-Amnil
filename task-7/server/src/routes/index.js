const express = require('express');
const router = express.Router();

const userRouter = require("./user.route");
const produtRouter = require("./product.route");


// const JwtAuthenticationMiddleware = require('../middlewares/JwtAuthentication.middleware');



router.use("/users", userRouter);
router.use("/products", produtRouter);

//authentication middleware

// router.use(JwtAuthenticationMiddleware)


module.exports = router;