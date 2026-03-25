'use strict';
const {
  Model
} = require('sequelize');
const { Enum } = require('../utils/common')
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = Enum.USER_ROLES_ENUMS
console.log(ADMIN)

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {
      this.belongsToMany(models.User,{through:'User_Roles',as:'users'})

    }
  }
  Role.init({
    name: {
      type: DataTypes.ENUM({
        values: [ADMIN, CUSTOMER, FLIGHT_COMPANY],

      }),
      allowNull:false,
      defaultValue:CUSTOMER
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};