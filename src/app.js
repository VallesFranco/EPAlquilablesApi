const express = require('express')
const data = require('../data/data.json')
const db = require('./db/models');

const app = express();
app.use(express.json())

app.get('/alquilable', async (req, res)=> {
    const alquilables = await db.Alquilable.findAll({})
    res.status(200).json(alquilables)
})

app.get('/alquilable/:id', async (req, res)=> {
    const idAlquilable = req.params.id;
    const alquilable = await db.Alquilable.findOne({
        where: {id: idAlquilable},
        include:['registros']
    })
    res.status(200).json(alquilable)
}) 

app.delete('/alquilable/:id', async (req, res)=> {
    const id = req.params.id;
    const row = await db.Alquilable.destroy({where:{id}})
    if(row) {
        res.status(200).json(`El alquilable con ID ${id} se borro con exito.`)
    } else {
        res.status(404).json(`El alquilable con ID ${id} no existe.`)
    }
})

app.delete('/alquilable/:idAlquilable/registro/:idRegistro', async (req, res)=> {
    const idAlquilable = req.params.idAlquilable;
    const idRegistro = req.params.idRegistro;
    const row = await db.Registro.destroy({where:{id: idRegistro, rentable_id: idAlquilable}})
    if(row) {
        res.status(200).json(`El registro con ID ${idRegistro} se borro con exito del alquilable con ID ${idAlquilable}.`)
    } else {
        res.status(404).json(`El registro con ID ${idRegistro} no se encontró en el alquilable con ID ${idAlquilable}.`)
    }
})

app.delete('/registro/:id', async (req, res)=>{
    const id = req.params.id;
    const row = await db.Registro.destroy({where:{id}})
    if(row) {
     res.status(200).json(`El registro con ID ${id} se borro con exito.`)
    } else {
     res.status(404).json(`El registro con ID ${id} no existe.`)
    }
})

app.post('/alquilable', async (req, res)=> {
    try {
        const alquilable = req.body
        const newRecord = await db.Alquilable.create(alquilable)
        res.status(201).json(newRecord)
    } catch(err) {
        res.status(500).json(err.message)
    }
})

app.post('/alquilable/:id/registro', async (req, res)=> {
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

app.put('/alquilable/:id', (req, res)=> {
    const id = req.params.id;
    const idx = data.findIndex(e => e.id == id)
    if (idx >= 0) {
        data[idx] = {id: Number(id), ...req.body}
        res.status(200).json(data[idx])
    } else
        res.status(404).json({error: `El ID ${id} no existe.`})
})

app.listen(3000, async ()=> {
    console.log(`La app arrancó correctamente en el puerto 3000.`);
    try {
        await db.sequelize.authenticate()
        await db.sequelize.sync({force:true});
        db.Alquilable.create({
            descripcion: "Castillo inflable",
            disponible: true,
            precio: 1200,
            registros: [
                {
                    fecha: new Date('2024-01-05'),
                    abono: true,
                    id_cliente: 1
                },
                {
                    fecha: new Date('2024-03-15'),
                    abono: false,
                    id_cliente:1
                },
                {
                    fecha: new Date('2024-03-17'),
                    abono: false,
                    id_cliente:1
                }
            ] 
        }, {include:['registros']})
        db.Alquilable.create({
            descripcion: "Toro mecanico",
            disponible: true,
            precio: 1400
        })
    } catch(err) {
        console.log(err)
    }
})