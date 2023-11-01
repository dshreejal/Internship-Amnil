require("dotenv").config();

const express = require("express");
const app = express();

const ejs = require("ejs");


app.use(express.static('public'));

app.use(express.json());


const routes = require("./routes");

const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');


app.use("/api", routes);

app.use('/', swaggerUI.serve, swaggerUI.setup(docs));



module.exports = app;