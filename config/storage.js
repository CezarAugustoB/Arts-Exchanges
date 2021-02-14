const multer = require("multer")
const util = require("util")
const path = require("path")

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(`${__dirname}/../tmp`))
    },
    filename: (request, file, callback) => {
        const match = ["image/png", "image/jpeg"]
        if (match.indexOf(file.mimetype) === -1) {
            const error = { code: "INVALID_PARAMETERS", statusCode: 415, message: `${file.originalname} is invalid. Only accept png/jpeg.` }
            return callback(error, null)
        }
        const filename = `${file.originalname}`
        callback(null, filename)
    }
})
const uploadFiles = multer({ storage }).array("files", 10)
const uploadSync = util.promisify(uploadFiles)

module.exports = {
    upload: uploadSync,
    storage
}