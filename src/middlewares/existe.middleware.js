const existeById = (Model) => {
    return async (req, res, next) => {
        const id = req.params.id
        const instancia = await Model.findByPk(id)
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        if (!instancia) {
            return res.status(404).json({mensaje: `El ${modelName} con ID ${id} no existe.`})
        }
        next()
    }
}

const validaScheme = (scheme) => {
    return async (req, res, next) => {
        const resultado = scheme.validate(req.body, {abortEarly: false})
        if (resultado.error) {
            return res.status(400).json({errores: resultado.error.details.map(
                    error => ({error: error.message})
                )
            })
        }    
        next()
    }    
}

module.exports = {existeById, validaScheme}