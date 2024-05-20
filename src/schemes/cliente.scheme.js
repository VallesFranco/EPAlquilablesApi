const Joi = require('joi')

const clienteScheme = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(10).messages({
        "string.min": `El nombre debe tener al menos {#limit} caracteres.`,
        "string.max": `El nombre debe tener como máximo {#limit} caracteres.`,
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es requerido."
    }),
    fechaNacimiento: Joi.string().required().messages({
        "any.required": "La fecha de nacimiento es requerida."
    })
})

module.exports = clienteScheme