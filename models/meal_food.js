'use strict';

module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    mealId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
  };
  return MealFood;
};
