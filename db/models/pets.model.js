const { Model, DataTypes, Sequelize } = require('sequelize');
const {USER_TABLE} =require('./users.model')

const PET_TABLE = 'pets';

const PetSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  age: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },

    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }

}

class Pet extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PET_TABLE,
      modelName: 'Pet',
      timestamps: false,
    }
  }
}

module.exports = { Pet, PetSchema, PET_TABLE };