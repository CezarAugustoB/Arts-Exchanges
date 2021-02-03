const express = require('express')
const app = express()
const path = require('path')
const indexRouter = require('./routes/index')
const noteRouter = require('./routes/note')

require('dotenv').config()
require('./config/connection')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use("/", indexRouter)
app.use("/note", noteRouter)

app.set('PORT', process.env.PORT)
app.listen(app.get('PORT'), function () {
    console.log(`Server listen on port ${app.get('PORT')}`)
})