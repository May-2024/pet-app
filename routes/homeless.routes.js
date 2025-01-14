const express = require('express');

const {HomelessService} = require('../services/homeless.service');
const validatorHandler = require('../middlewares/validator.handler');
const {UserService} = require('../services/user.service');
const {
  createHomelessSchema,
  getHomelessSchema,
  updateHomelessSchema,
  adopt,
} = require('../schemas/homeless.schema');

const router = express.Router();
const Uservice = new UserService();
const Hservice = new HomelessService();

router.get('/',  async (req, res, next) => {
  try {
    const respuesta = await Hservice.getAllHomeless()
    res.status(respuesta.statusCode).json(respuesta);
  } catch (error) {
    console.error(error.message)
    next(error);
  }
});

router.post('/',
  validatorHandler(createHomelessSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body)
      const respuesta = await Hservice.createHomeless(body)
      res.status(respuesta.statusCode).json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/adopt',
  // lo q se valida desde schema, de donde se obtiene la info (body o params)
  validatorHandler(adopt, 'body'),
  async (req, res, next) => {
    try {
      const name= req.body.name;
      const user_id = req.body.user_id;
      const homelessId = req.body.homelessId;
      const respuesta = await Hservice.adoptHomeless(user_id, homelessId, name)
      res.status(respuesta.statusCode).json(respuesta);


    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      //result almacena el resultado del metodo update que usamos
      //para actualizar
      const result = await Hservice.updateOneHomeless(id, body);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const respuesta = await Hservice.deleteHomeless(id);
      res.status(respuesta.statusCode).json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;