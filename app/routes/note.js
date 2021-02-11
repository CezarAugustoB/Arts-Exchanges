const router = require('express').Router()
const Note = require('../controllers/Note')

const controllerIstance = new Note()

router.get('/', (req, res, next) => controllerIstance.index({ request: req, response: res, next }))
router.post('/', (req, res, next) => controllerIstance.store({ request: req, response: res, next }))
router.patch('/:id', (req, res, next) => controllerIstance.show({ request: req, response: res, next }))
router.delete('/:id', (req, res, next) => controllerIstance.delete({ request: req, response: res, next }))
router.put('/:id', (req, res, next) => controllerIstance.update({ request: req, response: res, next }))


module.exports = router
