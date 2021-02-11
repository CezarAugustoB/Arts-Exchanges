const sequelize = require("./database")
const { Note } = require('../app/models/Note')
const { User } = require('../app/models/User/User')

return sequelize.authenticate()
    .then(result => {
        console.log(`\x1b[32m > Models Sync\x1b[0m`)
        User.sync()
        Note.sync()
    })
    .then(result => {
        console.log(`\x1b[32m > Synchronized Models\x1b[0m`)
        return result
    })
    .catch(error => {
        console.error('\x1b[31m > Unable to connect to MySQL database: ', error, '\x1b[0m')
    })
