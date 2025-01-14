const express = require('express');

const {PetService} = require('../services/pets.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPetSchema,
  getPetSchema,
  updatePetSchema,
} = require('../schemas/pet.schema');

const router = express.Router();
const Pservice = new PetService();

router.get('/',  async (req, res, next) => {
  try {
    const respuesta = await Pservice.getAllPets()
    res.status(respuesta.statusCode).json(respuesta);
  } catch (error) {
    console.error(error.message)
    next(error);
  }
});

router.get('/tuyos/:id',  async (req, res, next) => {
  try {console.log(req)
    const respuesta = await Pservice.getUserPets(req.params.id)
    res.status(respuesta.statusCode).json(respuesta);
  } catch (error) {
    console.error(error.message)
    next(error);
  }
});

// router.get('/cuantos',  async (req, res, next) => {
//   try {console.log(req)
//     res.json(await Pservice.getUserPets(req.));
//   } catch (error) {
//     console.error(error.message)
//     next(error);
//   }
// });

router.post('/',
  validatorHandler(createPetSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body)
      const respuesta = await Pservice.createPet(body)
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
      const result = await Pservice.updateOnePet(id, body);
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
      const respuesta = await Pservice.deletePet(id);
      res.status(respuesta.statusCode).json(respuesta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;