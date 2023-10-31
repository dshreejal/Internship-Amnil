const express = require('express');
const router = express.Router();

const userRouter = require("./user.route");


// const JwtAuthenticationMiddleware = require('../middlewares/JwtAuthentication.middleware');



router.use("/users", userRouter);


//authentication middleware

// router.use(JwtAuthenticationMiddleware)


module.exports = router;