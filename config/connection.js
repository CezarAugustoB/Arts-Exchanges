const sequelize = require("./database")
const { Log } = require('../app/models/Log')

return sequelize.authenticate()
    .then(result => {
        console.log(`\x1b[32m > Models Sync\x1b[0m`)
        Log.sync()
    })
    .then(result => {
        console.log(`\x1b[32m > Synchronized Models\x1b[0m`)
        return result
    })
    .catch(error => {
        console.error('\x1b[31m > Unable to connect to MySQL database: ', error, '\x1b[0m')
    })
