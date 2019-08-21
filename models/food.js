'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    Food.belongsToMany(models.Meal, {as: 'Foods', through: 'mealfoods', foreignKey: 'mealId'})
    // Food.hasMany( models.Meal, { as: 'meal' })
  };
  return Food;
};
