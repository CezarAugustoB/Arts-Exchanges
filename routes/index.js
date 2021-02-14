var express = require('express')
var router = express.Router()

const MailContoller = require("../app/controllers/MailController")
const controllerIstance = new MailContoller()

router.get('/', function (req, res, next) {
    res.send({ greeting: "Art's Exchanges Server" })
})

router.post('/upload-images', (req, res, next) => controllerIstance.upload({ request: req, response: res }).catch(next))

module.exports = router
