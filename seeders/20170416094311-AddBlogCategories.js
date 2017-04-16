'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {



  return queryInterface.bulkInsert('Categories', [{
        name: 'Technical Blogs',
        description: "Complete Description of technical blogs",
        sortOrder:1,
      },{
        name: 'Motivational Blogs',
        description: "Complete Description of motivational blogs",
        sortOrder:2,
      },{
        name: 'General Section',
        description: "Complete Description of general section",
        sortOrder:3,
      }], {});


    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
