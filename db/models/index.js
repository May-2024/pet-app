
const { User, UserSchema } = require('./users.model');
const { Pet, PetSchema } = require('./pets.model');
const {Homeless, HomelessSchema} = require('./homeless.model')


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Pet.init(PetSchema, Pet.config(sequelize));
  Homeless.init(HomelessSchema, Homeless.config(sequelize));

  User.associate(sequelize.models);
  Pet.associate(sequelize.models);
  
}

module.exports = setupModels;
