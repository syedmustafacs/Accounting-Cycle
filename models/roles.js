'use strict';
module.exports = function(sequelize, DataTypes) {
  var Roles = sequelize.define('Roles', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Roles.hasMany(models.User, {as:"Users",foreignKey:"roleId"})
      }
    }
  });
  return Roles;
};