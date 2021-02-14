'use strict'
const fs = require("fs")
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)
const existsAsync = promisify(fs.exists)

async function remove (filePath) {
    try {
        return await unlinkAsync(filePath)
    } catch (error) {
        console.log("\x1b[31m > Unable to remove file: ", error, '\x1b[0m')
        throw new Error(error)
    }
}
async function exists (filePath) {
    try {
        return existsAsync(filePath)
    } catch (error) {
        console.log("\x1b[31m > Unable to verify file: ", error, '\x1b[0m')
        throw new Error(error)
    }
}

module.exports = { remove, exists }