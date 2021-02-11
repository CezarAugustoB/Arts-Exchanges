const handleError = (err, res) => {
    res.locals.error = err
    if (err.statusCode >= 100 && err.statusCode < 600)
        res.locals.error.statusCode = err.statusCode
    else
        res.locals.error.statusCode = 500
    if (err.code)
        err.code = err.code
    else
        err.code = '[INTERNAL_ERROR]'
    const { statusCode, message, code } = err
    res.status(statusCode).json({
        status: code,
        statusCode,
        message: message || err.toString()
    })
}
module.exports = handleError