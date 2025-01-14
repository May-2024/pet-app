'use strict';

const { UserSchema, USER_TABLE } = require('../models/users.model');

//migracion para agregar una columna a una tabla ya existente
//sin riesgos de sobreexcritura

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
  }
};
