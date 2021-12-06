const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validate(data, schema) { // verifica si el esquema cumple con la estructura
  const { error } = joi.object(schema).validate(data);
  return error;
}

 function  validationHandler(schema, check = 'body') { // recibe la informacion y la pasa a verificar, luego manda el mensaje de error si lo hay
  return async function(req, res, next) {
    // console.log(req[check]);
    let user = req[check].user;
    const error = await validate(user, schema);


    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
