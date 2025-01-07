const { Model, DataTypes, Sequelize } = require('sequelize');
const {USER_TABLE} =require('./users.model')

const HOMELESS_TABLE = 'homeless';

const HomelessSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  age: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  gender: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

  animal: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

  ubicacion: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },

  contacto: {
    allowNull: false,
    type: DataTypes.STRING(255),
  }

}

class Homeless extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: HOMELESS_TABLE,
      modelName: 'Homeless',
      timestamps: false,
    }
  }
}

module.exports = { Homeless, HomelessSchema, HOMELESS_TABLE };