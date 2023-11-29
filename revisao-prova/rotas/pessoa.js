const Router = require('express').Router()
const controller = require('../controllers/pessoa.js')

Router.get('/pessoa', controller.get)
Router.get('/pessoa/:id', controller.getById)
Router.post('/pessoa', controller.create)
Router.put('/pessoa/:id', controller.update)
Router.delete('/pessoa/:id', controller.destroy)

module.exports = Router