const joi = require('@hapi/joi'); //Esta libreria nos permite definir el esquema que va hacer usado en la coleccion de usuarios

const serverIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createServerSchema = {
    name: joi.string().max(100).required(),
    ip: joi.string().max(100).required(),

    vpn: joi.string().max(100).required(),
    
    
    ipNormal: joi.string().max(100).required(),
    ipVpn: joi.string().max(100).required(),
    state: joi.boolean(),
    config: joi.string().max(100).required(),

}

module.exports = {
    serverIdSchema,
    createServerSchema
}