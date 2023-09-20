require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const connectToMongo = require("./config/db")
connectToMongo();

//cors to allow cross origin requests. 
//TODO: add a whitelist of domains to allow only those domains to make requests to the server.
const cors = require('cors');
app.use((cors()));

const quizRouter = require("./routes/quiz.route");


app.use('/api/quiz', quizRouter);

//TODO: add a error handler middleware to gracefully handle all the erros.

module.exports = app;