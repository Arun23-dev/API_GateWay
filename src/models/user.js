'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[3,50],
      }
    }, 
    sequelize,
    modelName: 'User',
  });
  return User;
};