'use strict';
module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    sortOrder: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Categories.belongsToMany(models.Blogs,{
          through:{
            model: models.Blogs2Categories,
            foreignKey: "categoryId",
            as:"blog"

          }
        });

      }
    }
  });
  return Categories;
};