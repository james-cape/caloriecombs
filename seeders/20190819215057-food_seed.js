'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Food', [
    {
      name: 'banana',
      calories: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'mushroom',
      calories: 105,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'salmon',
      calories: 175,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'peanut butter',
      calories: 195,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
