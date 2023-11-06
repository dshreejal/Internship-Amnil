require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.static('public'));

app.use(express.json());

const routes = require("./routes");

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');

app.use(loggerMiddleware);

app.get("/", (req, res) => {
    const message = `Backend Server Running Successfully. Mode: ${process.env.NODE_ENV}. Time: ${new Date()}`;
    res.send(message);
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use("/api", routes);

app.use((req, res, next) => {
    const error = new Error('404 Not Found');
    error.status = 404;
    next(error);
})
app.use(errorHandlerMiddleware);

module.exports = app;