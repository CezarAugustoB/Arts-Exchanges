var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
    res.send({ greeting: "Art's Exchanges Server" })
})

module.exports = router
