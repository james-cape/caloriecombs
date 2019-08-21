var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;

/* GET all foods */
router.get("/", function(req, res, next) {
  Food.findAll()
    .then(foods => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

/* GET a single food by :id */
router.get("/:id", function(req, res, next) {
  Food.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(food => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
});

/* POST to create a food */
router.post("/", (req, res) => {
  if (req.body.food.name && req.body.food.calories) {
    Food.create({
      name: req.body.food.name,
      calories: req.body.food.calories
    })
    .then(food => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(food));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({error: "Please provide a food with a name and calories."}));
  }
})

/* PATCH to update a food */
router.patch("/:id", (req, res) => {
  if (req.body.food) {
    Food.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(food => {
      if (food) {
        food.update({
          name: req.body.food.name,
          calories: req.body.food.calories
        })
        .then(updatedFood => {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify(updatedFood));
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({error})
        })
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({error: "Please provide a food with a name or calories to update."}));
  }
})
module.exports = router;
