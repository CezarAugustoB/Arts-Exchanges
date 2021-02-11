'use strict'
const fs = require("fs")
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const appendFileAsync = promisify(fs.appendFile)
const truncateAsync = promisify(fs.truncate)

async function load (filePath) {
    try {
        const fileBuffer = await readFileAsync(filePath, 'utf-8')
        return JSON.parse(fileBuffer)
    } catch (error) {
        console.log("\x1b[31m > Unable to load data from file: ", error, '\x1b[0m')
    }
}
async function save (filePath, content) {
    const contentString = JSON.stringify(content)
    try {
        return await writeFileAsync(filePath, contentString)
    } catch (error) {
        console.log("\x1b[31m > Unable to save data within the file: ", error, '\x1b[0m')
    }
}
async function append (filePath, content) {
    try {
        return await appendFileAsync(filePath, content)
    } catch (error) {
        console.log("\x1b[31m > Unable to append file: ", error, '\x1b[0m')
    }
}
async function truncate (filePath) {
    try {
        truncateAsync(filePath, 0)
    } catch (error) {
        console.log("\x1b[31m > Unable to truncate file: ", error, '\x1b[0m')
    }
}

module.exports = { save, append, load, truncate }