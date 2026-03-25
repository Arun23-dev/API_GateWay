'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');                    // ← no {}
const { ServerConfig } = require('../config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany( models.Role,{ through: 'User_Roles' ,as:'roles'})
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 501],
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async function (user) {

    const encrypted = await bcrypt.hash(user.password, parseInt(ServerConfig.SALT_ROUNDS));
    user.password = encrypted;

  });

  return User;
};