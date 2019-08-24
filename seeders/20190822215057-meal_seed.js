'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Meal', [
    {
      id: 1,
      name: 'Breakfast',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Snack',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'Lunch',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'Dinner',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Meal', null, {});
  }
};
