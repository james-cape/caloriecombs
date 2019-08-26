'use strict';
var Food = require('../models').Food;
var Meal = require('../models').Meal;
var MealFood = require('../models').MealFood;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Meals', [
      {
        id: 1,
        name: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()},
      {
        id: 2,
        name: "Snack",
        createdAt: new Date(),
        updatedAt: new Date()},
      {
        id: 3,
        name: "Lunch",
        createdAt: new Date(),
        updatedAt: new Date()},
      {
        id: 4,
        name: "Dinner",
        createdAt: new Date(),
        updatedAt: new Date()},
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Meals', null, {})
  }
};
