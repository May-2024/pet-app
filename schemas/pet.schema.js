const Joi = require('joi');

const id = Joi.number().integer();
const age =Joi.number();
const name = Joi.string().min(3).max(30);
const userId = Joi.number().integer();


const getPetSchema = Joi.object({
  id: id.required(),
});

const createPetSchema = Joi.object({
  name: name.required(),
  age: age.required(),
  userId: userId.required()

});

const updatePetSchema = Joi.object({
  name

});

module.exports = { getPetSchema, createPetSchema, updatePetSchema };