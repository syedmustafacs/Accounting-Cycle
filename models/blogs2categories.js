'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blogs2Categories = sequelize.define('Blogs2Categories', {
    blogId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Blogs2Categories;
};