'use strict';

module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    mealId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
    // models.Food.belongsToMany(models.Meal, {as: 'meal', through: 'mealfoods', foreignKey: 'foodId'})
    // models.Meal.belongsToMany(models.Food, {as: 'food', through: 'mealfoods', foreignKey: 'mealId'})
  };
  return MealFood;
};
