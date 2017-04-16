'use strict';
var models = require("../models");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Roles, {foreignKey: 'roleId',as: "Roles"})
        // associations can be defined here
        // console.log();
        
      }
    }
  });

 
 

  return User;
};