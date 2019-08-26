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

/* GET one meal by id */
router.get("/:id/foods", function(req, res) {
  Meal.findOne({
    include: Food,
    where: {
      id: req.params.id
    }
  })
  .then(meal => {
    if (meal) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(meal, ['id', 'name', 'Food', 'id', 'name', 'calories']));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send({error: `We can't find a meal with id ${req.params.id}`})
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
});

/* POST adds a food to a meal */
router.post('/:meal_id/foods/:id', (request, response) => {
  return Meal.findOne({
    include: Food,
    where: {
      id: request.params["meal_id"]
    }
  })
  .then(meal => {
    return Food.findOne({
      where: {
        id: request.params["id"]
      }
    })
    .then(food => {
      return meal.hasFood(food).then(result => {
        if (result == true) {
          response.setHeader('Content-Type', 'application/json');
          response.status(500).send({ error: 'Meal already has that food' });
        } else {
          meal.addFood(food)
          response.setHeader('Content-Type', 'application/json');
          response.status(200).send(JSON.stringify({message: `Successfully added ${food.name} to ${meal.name}`}));
        }
      })
    })
    .catch(error => {
      if (meal == null) {
        response.setHeader('Content-Type', 'application/json');
        response.status(500).send({ error: 'Meal not found' });
      } else {
        response.setHeader('Content-Type', 'application/json');
        response.status(500).send({ error: 'Food not found' });
      }
    })
  })
})

module.exports = router;
