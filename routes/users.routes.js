const express = require('express');

const {UserService} = require('../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');
const { PetSchema, Pet } = require('../db/models/pets.model');
const {PetService} = require('../services/pets.service')
const router = express.Router();

const Uservice = new UserService();
const Pservice = new PetService();


router.get('/', async (req, res, next) => {
  try {
    const users = await Uservice.getAllUsers();
    res.status(users.statusCode).json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/v2', async (req, res, next) => {
  try {
    const users = await Uservice.getUsers();

    for (const user of users) {
      const petsNumber = await Pservice.getUserPets(user.id);
      console.log(petsNumber)
      user.petsCounter = petsNumber.length
    }

    res.status(users.statusCode).json(users);

  } catch (error) {
    next(error);
  }
});

router.get('/adults', async (req, res, next) => {
  try {

    const users = await Uservice.getAdults();
    res.status(users.statusCode).json(users);
  } catch (error) {
    next(error);
  }
});



router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await Uservice.createUser(body);
      res.status(newUser.statusCode).json(newUser);
    } catch (error) {
      console.error(error)
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const result = await Uservice.updateUser(id, body);
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
      const respuesta = await Uservice.deleteUser(id);
      res.status(respuesta.statusCode).json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
