'use strict';
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    // Meal.hasMany( models.Food, {as: 'foods' })
    // this.belongsToMany(models.Food, {through: models.MealFood, foreignKey: 'MealId', onDelete: 'CASCADE'})
    this.belongsToMany(models.Food, {through: 'MealFoods', foreignKey: 'mealId', otherKey: 'foodId', onDelete: 'CASCADE'})

  };
  return Meal;
};
