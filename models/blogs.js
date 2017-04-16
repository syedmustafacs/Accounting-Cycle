'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blogs = sequelize.define('Blogs', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Blogs.belongsToMany(models.Categories,{
          through:{
            model:models.Blogs2Categories,
            foreignKey: "blogId",
            as: 'category'
          }
        })
      }
    }
  });
  return Blogs;
};