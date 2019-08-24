'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Food', [
      {
        id: 1,
        name: 'banana',
        calories: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'mushroom',
        calories: 105,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'salmon',
        calories: 175,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'peanut butter',
        calories: 195,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
