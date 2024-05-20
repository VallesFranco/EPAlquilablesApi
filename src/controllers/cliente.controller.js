const {Cliente} = require('../db/models')

const controller = {}

const getAllUsers = async (req, res) => {
    res.status(200).json(await Cliente.findAll({}))
}
controller.getAllUsers = getAllUsers

const clienteById = async (req, res) => {
    const id = req.params.id
    res.status(200).json(await Cliente.findByPk(id))
}
controller.clienteById = clienteById

const crearCliente = async (req, res) => {
    const cliente = await Cliente.create(req.body)
    res.status(201).json(cliente)
}
controller.crearCliente = crearCliente

module.exports = controller