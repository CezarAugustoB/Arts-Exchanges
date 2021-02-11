const handleErrorMiddleware = require("./handleErrorMiddleware")
const logRequest = (req, res, next) => {
    console.log('\x1b[35m > Request time:', Date.now(), '\x1b[0m')
    console.log('\x1b[35m > Request method:', req.method, '\x1b[0m')
    console.log('\x1b[35m > Request path:', req.path, '\x1b[0m')
    console.log('\x1b[35m > Request url:', req.url, '\x1b[0m')
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