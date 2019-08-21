var Food = require('../../models').Food;
var Meal = require('../../models').Meal;

module.exports = async function cleanup() {
  await Food.destroy({ where: {} });
  // await Meal.destroy({ where: {} });
  await Meal.destroy({ where: {} });
}
