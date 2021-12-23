const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const { createUserSchema } = require('../utils/schemas/users');

const { config } = require('../config');

// Basic strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();

  // **************************************** Ingresar **************************************
  router.post('/sign-in', async function(req, res, next) {
    // const { apiKeyToken } = req.body;

    // if (!apiKeyToken) {
    //   next(boom.unauthorized('apiKeyToken is required'));
    // }
    passport.authenticate('basic', async function(error, user) { //esto nostrae a el usuario y luego procedemos a firmar el token
     
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, { session: false }, async function(error) {
          if (error) {
            next(error);
          }

          const { _id: id, nickName, rol } = user; //extrayendo de user
          
          let apikey = null;
          if(rol === "superUsuario"){
            apikey = await apiKeysService.getApiKey({ token: config.superApiKeyToken });
          }

          if(rol === "administrador"){
            apikey = await apiKeysService.getApiKey({ token: config.fullApiKeyToken });
          }

          if(rol === "mantenimiento"){
            apikey = await apiKeysService.getApiKey({ token: config.middleApiKeyToken });
          }
          
          if(rol === "usuario"){
            apikey = await apiKeysService.getApiKey({ token: config.basicApiKeyToken });
          }

          if (!apikey) {
            next(boom.unauthorized());
          }


          const payload = { sub: id, nickName, scopes: apikey.scopes };

          const token = jwt.sign(payload, config.authJwtSecret, { //firmando token (emcribtando)
            expiresIn: '20m'
          });

          return res.status(200).json({ token, user: { id, nickName } });
          });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  // **************************************** Registrarse **************************************
  router.post('/sign-up',  validationHandler(createUserSchema), async function( req, res, next ) {
    const { body } = req;
    const user = body.user;
    try {
      const newUserId = await usersService.createUser({ user });
      res.status(201).json({
        data: newUserId,
        message: 'user created'
      });
    } catch (error) {
      next(error);
    }
  });


  // +++++++++++++++++++++++++++++++++++++++++++ CERRAR SESION +++++++++++++++++++++++++++++++++++
  router.post('/logout',passport.authenticate('jwt',{session:false}), (req, res) => {
    const { token } = req.body;
    const userId = req.user._id;
    try {
      refreshTokens = refreshTokens.filter(t => t !== token);
      res.status(200).json({
        data: userId,
        message: 'Logout successful'
      });
    } catch (error) {
      next(error);
    }
  });
  
}

module.exports = authApi;
