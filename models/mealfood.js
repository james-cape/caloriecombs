'use strict';

module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    mealId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
    models.Food.belongsToMany(models.Meal, {as: 'Meals', through: 'mealfoods', foreignKey: 'foodId'})
    models.Meal.belongsToMany(models.Food, {as: 'Foods', through: 'mealfoods', foreignKey: 'mealId'})
  };
  return MealFood;
};
