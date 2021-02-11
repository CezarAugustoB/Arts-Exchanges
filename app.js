const express = require('express')
const app = express()
const path = require('path')
const indexMiddleware = require("./middlewares/indexMiddleware.js")
const indexRouter = require('./app/routes/index')
const noteRouter = require("./app/routes/note")
const userRouter = require("./app/routes/user")

require('dotenv').config()
require('./app/config/connection')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(indexMiddleware.logRequest)

app.use("/", indexRouter)
app.use("/note", noteRouter)
app.use("/user", userRouter)

app.use(indexMiddleware.checkRoute)
app.use(indexMiddleware.handleError)

app.set('PORT', process.env.PORT)
app.listen(app.get('PORT'), function () {
    console.log(`\x1b[33m > Server listen on port ${app.get('PORT')}\x1b[0m`)
})