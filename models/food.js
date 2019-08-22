'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    // Food.hasMany( models.Meal, { as: 'meals' })
    this.belongsToMany(models.Meal, {through: 'MealFoods', foreignKey: 'foodId', otherKey: 'mealId', onDelete: 'CASCADE'});
  };
  return Food;
};
