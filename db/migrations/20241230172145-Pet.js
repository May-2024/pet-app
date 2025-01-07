'use strict';

const { PetSchema, PET_TABLE } = require('../models/pets.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PET_TABLE, PetSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PET_TABLE);
  }
};