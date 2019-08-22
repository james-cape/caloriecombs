var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;

/* GET all meals */

router.get('/', (request, response) => {
  return Meal.findAll({
    include: Food
  })
  .then(meals => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(meals, ['id', 'name', 'Food', 'id', 'name', 'calories']));
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

module.exports = router;
