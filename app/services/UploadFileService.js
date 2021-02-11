"use strict"

class FileUploadService {
    constructor(filePath) {
        this.filePath = filePath
    }

    async delete (oldPath) {
        if (oldPath) {
            if (exists) {
            }
        }
    }

    async upload (base64File) {
        const ext = base64File.split(';')[0].match(/jpeg|jpg|png|gif/)[0]
        const randomSequence = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        const name = `${randomSequence}.${ext}}`
        const filePath = `${this.filePath}/${name}`

        let data = base64File.split("base64,")[1]
        data = data.replace(/(\r\n|\n|\r)/gm, "")

        return { status: 'File uploaded to space', filePath }
    }
}

module.exports = FileUploadService
