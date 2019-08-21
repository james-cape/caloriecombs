'use strict';
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    // Meal.hasMany( models.Food, {as: 'foods' })
    Meal.belongsToMany(models.Food, {as: 'meals', through: 'mealfoods', foreignKey: 'foodId'})
  };
  return Meal;
};
