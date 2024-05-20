const {Router} = require('express')
const {Cliente} = require('../db/models')
const userController = require('../controllers/cliente.controller')
const middlewareCliente = require('../middlewares/existe.middleware')
const clienteScheme = require('../schemes/cliente.scheme')

const route = Router();

route.get('/clientes', userController.getAllUsers)
route.get('/clientes/:id', middlewareCliente.existeById(Cliente), userController.clienteById)
route.post('/clientes', middlewareCliente.validaScheme(clienteScheme), userController.crearCliente)

module.exports = route