const handleError = (err, res) => {
    res.locals.error = err
    if (err.statusCode >= 100 && err.statusCode < 600)
        err.statusCode = err.statusCode
    else
        err.statusCode = 500
    if (err.code)
        err.code = err.code
    else
        err.code = 'INTERNAL_SERVER_ERROR'

    const { statusCode, message, code } = err
    res.status(statusCode).json({
        status: code,
        statusCode,
        message: message
    })
}
module.exports = handleError