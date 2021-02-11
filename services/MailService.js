"use strict"

var hbs = require('nodemailer-express-handlebars')
const mail = require("../config/mail")
const path = require("path")
class MailService {

    constructor({ from, to, bcc, subject, template, context }, { host, port, user, pass } = {}) {
        this.message = { from, to, bcc, subject, template, context }
        this.config = { host, port, user, pass }
    }
    async send () {
        try {
            const viewPath = path.resolve(__dirname, '..', 'views', 'emails')
            this.transposer = mail(this.config)
            this.transposer.use('compile', hbs({
                viewEngine: {
                    defaultLayout: undefined,
                    partialsDir: path.resolve('./views/emails/')
                },
                viewPath,
                extName: '.hbs'
            }))
            await this.transposer.sendMail(this.message, (error, info) => {
                if (error) {
                    console.error('\x1b[31m > Unable to send email: ', error, '\x1b[0m')
                } else {
                    console.error('\x1b[32m > Email sent: ', info, '\x1b[0m')
                }
            })
        } catch (error) {
            console.error('\x1b[31m > Unable to send email: ', error, '\x1b[0m')
        }
    }

}
module.exports = MailService