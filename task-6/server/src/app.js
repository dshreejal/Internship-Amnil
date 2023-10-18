require("dotenv").config();

const express = require("express");
const app = express();

const ejs = require("ejs");

const connectToMongo = require("./config/db");
connectToMongo();


app.use(express.static('public'));

app.use(express.json());

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
    res.render("home");
});

const routes = require("./routes");

const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');

app.use('/', swaggerUI.serve, swaggerUI.setup(docs));

app.use("/api", routes);

module.exports = app;