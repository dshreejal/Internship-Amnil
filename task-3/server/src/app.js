require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./routes/user.route");
const produtRouter = require("./routes/product.route");

app.use("/api/users", userRouter);
app.use("/api/products", produtRouter);


module.exports = app;