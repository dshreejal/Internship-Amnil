const express = require("express");
const app = express();
const connectToMongo = require("./config/db")
require("dotenv").config();

connectToMongo();

const cors = require('cors');
app.use((cors()));


app.use(express.json());

module.exports = app;