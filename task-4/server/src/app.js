require("dotenv").config();

const express = require("express");
const app = express();

const connectToMongo = require("./config/db");
connectToMongo();

app.use(express.json());

const userRouter = require("./routes/user.route");
const produtRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");

app.use("/api/users", userRouter);
app.use("/api/products", produtRouter);
app.use("/api/orders", orderRouter);


module.exports = app;