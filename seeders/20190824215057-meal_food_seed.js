'use strict';
var Food = require('../models').Food;
var Meal = require('../models').Meal;
var MealFood = require('../models').MealFood;


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MealFoods', [
      {
        foodId: 1,
        mealId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foodId: 2,
        mealId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foodId: 3,
        mealId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foodId: 4,
        mealId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foodId: 3,
        mealId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        foodId: 1,
        mealId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MealFoods', null, {});
  }
};
