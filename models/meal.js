'use strict';
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    foods: DataTypes.ARRAY(Sequelize.TEXT)
  }, {});
  Meal.associate = function(models) {
    // Meal.hasMany( models.Food, {as: 'food' })
    Meal.belongsToMany(models.Food, {as: 'Meals', through: 'mealfoods', foreignKey: 'foodId'})
    //
    // Meal.belongsTo(models.Food, {foreignKey: 'foodId', as: 'food'})
    // Meal.belongsToMany(models.WorkingDay, {through: 'mealfoods', foreignKey: 'userId', as: 'days'})
  };
  return Meal;
};
