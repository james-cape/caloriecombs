'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    // Food.hasMany( models.Meal, { as: 'meals' })
    Food.belongsToMany(models.Meal, {as: 'foods', through: 'mealfoods', foreignKey: 'mealId'})
  };
  return Food;
};
