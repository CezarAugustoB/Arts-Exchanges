const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config()
require('./config/connection')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('PORT', process.env.PORT)
app.listen(app.get('PORT'), function () {
    console.log(`Server listen on port ${app.get('PORT')}`)
})