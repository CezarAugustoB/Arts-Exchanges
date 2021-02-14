"use strict"

const multer = require("multer")
const fs = require("../services/fsService")
const { storage, upload } = require("../../config/storage")
class FileUploadService {
    constructor({ request, response }) {
        this.request = request
        this.response = response
    }

    async saveImages () {
        try {
            await upload(this.request, this.response)
            if (this.request.files.length <= 0) {
                throw { status: 400, code: "EXPECTED_IMAGES", message: `You must select at least 1 file` }
            }
            console.log(`\x1b[32m > Recorded Images\x1b[0m`)
            return { status: 200, paths: this.request.files }
        } catch (error) {
            if (error.code === "LIMIT_UNEXPECTED_FILE") {
                throw { code: error.code, statusCode: 400, message: "Unexpected File" }
            }
            throw error
        }
    }

    async delete (filePath) {
        try {
            if (filePath && fs.exists(filePath)) {
                fs.remove(filePath)
            }
        } catch (error) {
            throw error
        }
    }


}

module.exports = FileUploadService
