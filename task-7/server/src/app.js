require("dotenv").config();

const express = require("express");
const app = express();

const ejs = require("ejs");


app.use(express.static('public'));

app.use(express.json());


const routes = require("./routes");


app.use("/api", routes);



module.exports = app;