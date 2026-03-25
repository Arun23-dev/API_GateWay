'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Role extends Model {
    static associate(models) {}
  }

  User_Role.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',   
        key: 'id',
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' 
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role', 
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'  
    }
  }, {
    sequelize,
    modelName: 'User_Role',
  });

  return User_Role;
};