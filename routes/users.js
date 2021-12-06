const express = require('express');
const UsersService = require('../services/users');
// const validationHandler = require('../utils/middleware/validationHandler');
//los routes solo se encargan de redireccionar y pasarle la data a los services para que ellos hagan sus operaciones y la devuelvan
//los routes no llevan logica

//protegiendo las rutas con jwt
const passport = require('passport');
require('../utils/auth/strategies/jwt');


function usersApi(app){
    const router = express.Router();
    app.use('/api/users', router);

    const usersService = new UsersService();

    router.get('/:email',/*passport.authenticate('jwt',{session:false}),*/ async function(req, res, next){
        const { email } = req.params;
        try {
            const user = await usersService.getUser({ email });
 
            res.status(200).json({
                data: user,
                message:'user retrieved'
            })
        } catch (error) {
            next(error);
        }
    });// devuelve un usuario

    router.get('/wp/:userId',/*passport.authenticate('jwt',{session:false}),*/ async function(req, res, next){
        const { userId } = req.params;
        try {
            const user = await usersService.getUserWithOutPassword({ userId });
 
            res.status(200).json({
                data: user,
                message:'user retrieved'
            })
        } catch (error) {
            next(error);
        }
    });// devuelve un usuario sin contraseña
    
    router.put('/:userId',/*passport.authenticate('jwt',{session:false}),*/ async function(req, res, next){
        const { userId } = req.params;
        const { body: user} = req;
        try {
            const updatedUserId = await usersService.updateUser({ userId, user });
            res.status(200).json({
                data: updatedUserId,
                message:'user updated'
            })
        } catch (error) {
            next(error);
        }
    });// devuelve a un id del usuario modificado
}

module.exports = usersApi;