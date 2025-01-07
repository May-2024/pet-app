const { DataTypes, Model, Sequelize } = require("sequelize");

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING(255),
    field: 'last_name',
  },
  age: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull:false,
    type: DataTypes.STRING(255),
    unique:true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(255)
  },


}

class User extends Model {
  static associate(models) {
    this.hasMany(models.Pet,{
      as: 'pets',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,

    }
  }
}


module.exports = { USER_TABLE, UserSchema, User }