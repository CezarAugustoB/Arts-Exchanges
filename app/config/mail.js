"use strict"

const nodemailer = require("nodemailer")
require('dotenv').config()

module.exports = ({ host, port, user, pass }) => nodemailer.createTransport({
    host: host || process.env.MAIL_HOST,
    port: port || process.env.MAIL_PORT,
    auth: {
        user: user || process.env.MAIL_USERNAME,
        pass: pass || process.env.MAIL_PASSWORD
    }
})