"use strict"

var hbs = require('nodemailer-express-handlebars')
const mail = require("../../config/mail")
const path = require("path")
const fsService = require('./fsService')
class MailService {

    constructor({ from, to, bcc, subject, template, context, attachments }, { host, port, user, pass } = {}) {
        this.message = { from, to, bcc, subject, template, context, attachments }
        this.config = { host, port, user, pass }
    }
    async send () {
        try {
            return new Promise((resolve, reject) => {
                const viewPath = path.resolve(__dirname, '..', '..', 'views', 'emails')
                this.transporter = mail(this.config)
                this.transporter.use('compile', hbs({
                    viewEngine: {
                        defaultLayout: undefined,
                        partialsDir: path.resolve('./views/emails/')
                    },
                    viewPath,
                    extName: '.hbs'
                }))
                this.transporter.sendMail(this.message, (error, info) => {
                    if (error) {
                        console.error('\x1b[31m > Unable to send email: ', error, '\x1b[0m')
                        reject(error)
                    } else {
                        console.error('\x1b[32m > Email sent: ', info.messageId, '\x1b[0m')
                        resolve(info.messageId)
                    }
                })
            })
        } catch (error) {
            console.error('\x1b[31m > Unable to send email: ', error, '\x1b[0m')
        }
    }
}
module.exports = MailService