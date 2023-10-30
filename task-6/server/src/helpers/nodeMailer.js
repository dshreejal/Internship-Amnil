const nodemailer = require("nodemailer");
require("dotenv").config();

const trasnporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.smtpUserEmail,
        pass: process.env.smtpUserPassword
    }
});

module.exports = trasnporter;
