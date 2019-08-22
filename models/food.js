'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    this.belongsToMany(models.Meal, {through: 'MealFoods', foreignKey: 'foodId', otherKey: 'mealId');
  };
  return Food;
};
