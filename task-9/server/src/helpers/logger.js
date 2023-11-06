const winston = require("winston");
require("dotenv").config();
require("winston-daily-rotate-file");

const logFormat = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json()
);

const loggerTransports = [];

const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    level: "debug",
});
loggerTransports.push(consoleTransport);

if (process.env.NODE_ENV === "production") {
    const rotateTransport = new winston.transports.DailyRotateFile({
        dirname: "logs",
        filename: "WinstonLogger-%DATE%.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "7d",
        format: logFormat,
        level: "info",
    });
    loggerTransports.push(rotateTransport);
}

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: logFormat,
    transports: loggerTransports,
});

module.exports = logger;