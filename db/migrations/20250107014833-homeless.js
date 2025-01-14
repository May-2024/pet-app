'use strict';

const { HomelessSchema, HOMELESS_TABLE } = require('../models/homeless.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(HOMELESS_TABLE, HomelessSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(HOMELESS_TABLE);
  }
};