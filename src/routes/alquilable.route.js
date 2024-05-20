const {Router} = require('express')
const db = require('../db/models')

const route = Router();

route.get('/alquilable', async (req, res)=> {
    const alquilables = await db.Alquilable.findAll({})
    res.status(200).json(alquilables)
})

route.get('/alquilable/:id', async (req, res)=> {
    const idAlquilable = req.params.id;
    const alquilable = await db.Alquilable.findOne({
        where: {id: idAlquilable},
        include: [
            {
                model: db.Registro,
                as: 'registros',
                include: [
                    {
                        model: db.Cliente,
                        as: 'cliente'
                    }
                ]
            }
        ]
    })
    res.status(200).json(alquilable)
})

route.delete('/alquilable/:id', async (req, res)=> {
    const id = req.params.id;
    const row = await db.Alquilable.destroy({where:{id}})
    if(row) {
        res.status(200).json(`El alquilable con ID ${id} se borro con exito.`)
    } else {
        res.status(404).json(`El alquilable con ID ${id} no existe.`)
    }
})

route.delete('/alquilable/:idAlquilable/registro/:idRegistro', async (req, res)=> {
    const idAlquilable = req.params.idAlquilable;
    const idRegistro = req.params.idRegistro;
    const row = await db.Registro.destroy({where:{id: idRegistro, rentable_id: idAlquilable}})
    if(row) {
        res.status(200).json(`El registro con ID ${idRegistro} se borro con exito del alquilable con ID ${idAlquilable}.`)
    } else {
        res.status(404).json(`El registro con ID ${idRegistro} no se encontró en el alquilable con ID ${idAlquilable}.`)
    }
})

route.delete('/registro/:id', async (req, res)=>{
    const id = req.params.id;
    const row = await db.Registro.destroy({where:{id}})
    if(row) {
     res.status(200).json(`El registro con ID ${id} se borro con exito.`)
    } else {
     res.status(404).json(`El registro con ID ${id} no existe.`)
    }
})

route.post('/alquilable', async (req, res)=> {
    try {
        const alquilable = req.body
        const newRecord = await db.Alquilable.create(alquilable)
        res.status(201).json(newRecord)
    } catch(err) {
        res.status(500).json(err.message)
    }
})

route.post('/alquilable/:id/registro', async (req, res)=> {
    const idAlquilable = req.params.id;
    const alquilable = await db.Alquilable.findByPk(idAlquilable)
    if(alquilable) {
        const registro = req.body
        const newRecord = await db.Registro.create({rentable_id: alquilable.id, ...registro})
        res.status(201).json(newRecord)
    } else {
        res.status(404).json({error: `El ID ${idAlquilable} no existe como alquilable.`})
    }
})

route.put('/alquilable/:id', (req, res)=> {
    const id = req.params.id;
    const idx = data.findIndex(e => e.id == id)
    if (idx >= 0) {
        data[idx] = {id: Number(id), ...req.body}
        res.status(200).json(data[idx])
    } else
        res.status(404).json({error: `El ID ${id} no existe.`})
})

module.exports = route