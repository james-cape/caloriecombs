'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Meal', [
      {
        name: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()},
      {
        name: "Snack",
        createdAt: new Date(),
        updatedAt: new Date()},
      {
        name: "Lunch",
        createdAt: new Date(),
        updatedAt: new Date()},
      {
        name: "Dinner",
        createdAt: new Date(),
        updatedAt: new Date()},
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Meal', null, {})
  }
};
