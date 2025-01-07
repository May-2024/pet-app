const express = require('express');


const usersRouter = require('./users.routes');
const petsRouter = require('./pets.routes');


function routerApi(app) {
  //cuando tenemos muchas rutas creamos una ruta maestra
  const router= express.Router();
  //definimos un endpoint en especifico con app.use
  app.use('/api-pets/v1',router);
  //asi generamos un path global para todos los endpoints abajo de este
  //PARA CADA VERSION SE CREA UN NUEVO INDEX


  router.use('/users', usersRouter);

  router.use('/pets', petsRouter);


}

module.exports = routerApi;