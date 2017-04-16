'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Roles', [{
        name: 'Admininstrator',
        slug: 'ADMIN'
      },{
        name:'Customer',
        slug: "CUSTOMER"
      },
      {
        name:'Staff/ Employees',
        slug: "STAFF"
      }], {});


  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
