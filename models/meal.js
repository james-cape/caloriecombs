'use strict';
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    this.belongsToMany(models.Food, {through: 'MealFoods', foreignKey: 'mealId', otherKey: 'foodId'})
  };
  return Meal;
};
