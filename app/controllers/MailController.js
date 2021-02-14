"use strict"

const UploadFileService = require("../services/UploadFileService")
const MailService = require("../services/MailService")
const fsService = require("../services/fsService")
const path = require("path")
const { throws } = require("assert")

class MailController {
    async receive ({ request, response }) {
        try {
            const body = request.body
            const images = await this.saveImages(request, response)

            const infoFilePath = path.resolve(__dirname, '..', 'helpers', 'info.json')
            const info = await fsService.load(infoFilePath)

            info.ticked_id = parseInt(info.ticked_id) + 1

            const { message } = await this.sendEmail(images, info, body)
            await this.removeImages(message.attachments)

            await fsService.save(infoFilePath, info)

            response.status(200).send('success')
        } catch (error) {
            throw error
        }
    }

    async sendEmail (images, { from, to, bcc, ticked_id }, { subject }) {
        try {
            const attachments = []
            for (const [index, file] of images.paths.entries()) {
                attachments.push({ filename: file.filename, path: file.path, cid: `image${index}` })
            }
            const cids = attachments.map(item => item.cid)

            const template = "test"
            const message = {
                from, to, bcc, subject, template,
                context: { title: `Ticket N° ${ticked_id}`, files: cids },
                attachments
            }
            const config = { authUser: "", authPass: "" }

            let mailService = new MailService(message, config)
            await mailService.send()

            return { message, config }
        } catch (error) {
            throw error
        }
    }

    async saveImages (request, response) {
        try {
            const uploadFileService = new UploadFileService({ request, response })
            return await uploadFileService.saveImages()
        } catch (error) {
            throw error
        }
    }
    async removeImages (attachments) {
        try {
            for (const file of attachments) {
                await fsService.remove(file.path)
            }
            console.log(`\x1b[32m > Deleted Images\x1b[0m`)
        } catch (error) {
            throw error
        }
    }
}

module.exports = MailController