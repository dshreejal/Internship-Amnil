require("dotenv").config();

const express = require("express");
const app = express();

const connectToMongo = require("./config/db");
connectToMongo();


app.use('/public', express.static('public'));

app.use(express.json());

const routes = require("./routes");

app.use("/", routes);



module.exports = app;