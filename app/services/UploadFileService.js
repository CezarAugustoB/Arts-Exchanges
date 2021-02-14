"use strict"

const multer = require("multer")
const fs = require("../services/fsService")
const { storage, upload } = require("../../config/storage")
class FileUploadService {
    constructor({ request, response }) {
        this.request = request
        this.response = response
    }

    async uploadFile () {
        try {
            await upload(this.request, this.response)
            if (this.request.files.length <= 0) {
                throw { status: 500, code: "EXPECTED_IMAGES", message: `You must select at least 1 file` }
            }
            console.log(`\x1b[32m > Recorded Images\x1b[0m`)
            return { status: 200, paths: this.request.files }
        } catch (error) {
            if (error.code === "LIMIT_UNEXPECTED_FILE") {
                throw { status: error.code, statusCode: 500, message: "Unexpected file type" }
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
