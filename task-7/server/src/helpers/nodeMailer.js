const nodemailer = require("nodemailer");
require("dotenv").config();

const trasnporter = nodemailer.createTransport({
    host: process.env.smtpHost,
    port: process.env.smtpPort,
    auth: {
        user: process.env.smtpUserEmail,
        pass: process.env.smtpUserPassword
    }
});

module.exports = trasnporter;
