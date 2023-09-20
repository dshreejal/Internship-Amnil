const express = require("express");
const app = express();
const connectToMongo = require("./config/db")
require("dotenv").config();

connectToMongo();

const cors = require('cors');
app.use((cors()));

const quizRouter = require("./routes/quiz.route");

app.use(express.json());
app.use('/api/quiz', quizRouter);

module.exports = app;