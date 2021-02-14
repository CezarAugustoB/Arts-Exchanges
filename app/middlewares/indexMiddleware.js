const handleErrorMiddleware = require("./handleErrorMiddleware")
const { Log } = require("../models/Log")

const logRequest = async (req, res, next) => {
    const time = Date.now()
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log('\n')
    console.log('\x1b[35m > Client IP:', ip, '\x1b[0m')
    console.log('\x1b[35m > Request time:', time, '\x1b[0m')
    console.log('\x1b[35m > Request method:', req.method, '\x1b[0m')
    console.log('\x1b[35m > Request path:', req.path, '\x1b[0m')
    console.log('\x1b[35m > Request url:', req.url, '\x1b[0m')

    await Log.create({ ip, time, method: req.method, path: req.path, url: req.url })
    next()
}
const checkRoute = (req, res, next) => {
    try {
        if (!req.route)
            return next({ statusCode: 404, message: "Route Not Found" })
        next()
    } catch (error) {
        return next(error)
    }
}
const handleError = (err, req, res, next) => {
    handleErrorMiddleware(err, res)
}
module.exports = { logRequest, checkRoute, handleError }