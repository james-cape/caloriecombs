var Food = require('../../models').Food;

module.exports = async function cleanup() {
  await Food.destroy({ where: {} })
}
