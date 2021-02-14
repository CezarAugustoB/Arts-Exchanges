"use strict"

const UploadFileService = require("../services/UploadFileService")
const MailService = require("../services/MailService")
const fsService = require("../services/fsService")

class MailController {
    async upload ({ request, response }) {
        try {
            const uploadFileService = new UploadFileService({ request, response, next })
            const files = await uploadFileService.uploadFile()

            let attachments = []
            for (const [index, file] of files.paths.entries()) {
                attachments.push({ filename: file.filename, path: file.path, cid: `image${index}` })
            }

            const cids = attachments.map(item => item.cid)
            const message = {
                from: '',
                to: '',
                subject: "Test Email",
                template: 'test',
                context: {
                    title: "TEST",
                    files: cids
                },
                attachments
            }
            const config = {
                authUser: "",
                authPass: ""
            }
            let mailService = new MailService(message, config)
            await mailService.send()

            for (const file of message.attachments) {
                await fsService.remove(file.path)
            }
            console.log(`\x1b[32m > Deleted Images\x1b[0m`)
            response.status(200).send('success')
        } catch (error) {
            throw error
        }


    }
}

module.exports = MailController