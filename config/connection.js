const sequelize = require("./database")
const Note = require('../models/Note')
const User = require('../models/User')

return sequelize.authenticate()
    .then(result => {
        Note.sync()
        User.sync()
    })
    .then(result => {
        console.log(`Note table created`)
        return result
    })
    .catch(error => {
        console.error('Unable to connect to MySQL database:', error)
    })
