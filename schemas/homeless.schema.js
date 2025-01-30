const Joi = require('joi');
const { Homeless } = require('../db/models/homeless.model');

const id = Joi.number().integer();
const age =Joi.number();
const animal = Joi.string().min(3).max(30);
const gender = Joi.string().min(3).max(30);
const ubicacion = Joi.string().min(3).max(30);
const contacto = Joi.string().min(3).max(30);
const status_adopted = Joi.boolean();



const adopt = Joi.object({
  homelessId: Joi.number().required().min(1),
  user_id: Joi.number().required().min(1),


})

const getHomelessSchema = Joi.object({
  id: id.required(),
});

const filterHomelessSchema = Joi.object({
  typeAnimal: Joi.string().min(3).required(),
});

const createHomelessSchema = Joi.object({

  age: age.required(),
  animal: animal.required(),
  gender: gender.required(),
  ubicacion: ubicacion.required(),
  contacto: contacto.required(),
});

const updateHomelessSchema = Joi.object({
  age,
  status_adopted,
});

module.exports = { getHomelessSchema, createHomelessSchema, updateHomelessSchema, adopt, filterHomelessSchema };