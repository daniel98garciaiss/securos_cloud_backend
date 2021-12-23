const express = require('express');
const ServersService = require('../services/servers');
const validationHandler = require('../utils/middleware/validationHandler');
//los routes solo se encargan de redireccionar y pasarle la data a los services para que ellos hagan sus operaciones y la devuelvan
//los routes no llevan logica

const { createServerSchema } = require('../utils/schemas/servers');

//protegiendo las rutas con jwt
const passport = require('passport');
require('../utils/auth/strategies/jwt');

// si no colocamos el middleware de passport.authenticate no podemos acceder a req.user
function serversApi(app){
    const router = express.Router();
    
    app.use('/api/servers', router);//añade un pedazo delante a la ruta para abreviar las rutas que se crean

    const serversService = new ServersService();
    router.get('/',passport.authenticate('jwt',{session:false}), async function(req, res, next){
        // console.log(req.user);
        try {
            const servers = await serversService.getServers({query :null});
 
            res.status(200).json({
                data: servers,
                message:'servers retrieved'
            })
        } catch (error) {
            next(error);
        }
    });// devuelve un usuario sin contraseña

    router.post('/create',  validationHandler(createServerSchema), async function( req, res, next ) {
        const { body } = req;
        const server = body.server;
        try {
          const newServerId = await serversService.createServer({ server });
          res.status(201).json({
            data: newServerId,
            message: 'server created'
          });
        } catch (error) {
          next(error);
        }
      });
 
}

module.exports = serversApi;