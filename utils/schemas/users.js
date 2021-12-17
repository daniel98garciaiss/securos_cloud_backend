const joi = require('@hapi/joi'); //Esta libreria nos permite definir el esquema que va hacer usado en la coleccion de usuarios

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = {
    name: joi.string().max(100).required(),
    lastName: joi.string().max(100).required(),

    nickName: joi.string().max(100).required(),
    
    password: joi.string().required(),

    login:  joi.boolean(),
    rol: joi.string()
}

module.exports = {
    userIdSchema,
    createUserSchema
}