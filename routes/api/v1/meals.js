var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;

/* GET all meals */
router.get("/", function(req, res, next) {
  Meal.findAll()
    .then(meals => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(meals, ['id', 'name', 'foods']));
      // res.status(200).send(JSON.stringify(meals, ['id', 'name', 'foods'['id', 'name', 'calories']]));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});


module.exports = router;





// /* GET a single meal by :id */
// router.get("/:id", function(req, res, next) {
//   Food.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(meal => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).send(JSON.stringify(meal));
//   })
//   .catch(error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500).send({error})
//   });
// });
