const {Router} = require('express')
const userController = require('../controllers/cliente.controller')

const route = Router();

route.get('/clientes', userController.getAllUsers)
route.get('/clientes/:id', userController.clienteById)
route.post('/clientes', userController.crearCliente)

module.exports = route