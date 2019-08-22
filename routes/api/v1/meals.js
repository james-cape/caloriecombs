var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;

/* GET all meals */
router.get("/", async (req, res, next) => {
  await Meal.findAll()
    .then(meals => {
      var i;
      var accumulator = [];

      for (i = 0; i < meals.length; i++) {
        var accumulator_object = {
          "id": meals[i].id,
          "name": meals[i].name,
          "foods": meals[i].getFood()
          .then(foods => {
            // Look into wrapping it in promise.all which will return all promises.
            return foods
          })

        }
        accumulator.push(accumulator_object)
      };
      return accumulator


      // for(meal; meal < meals.length; i++)
      // .then(foods => {
      //   console.log(foods)
      // });
      // res.setHeader("Content-Type", "application/json");
      // res.status(200).send(JSON.stringify(
      //   meals, ['id', 'name', 'foods']
      // ));
      // res.status(200).send(JSON.stringify(meals, ['id', 'name', 'foods'['id', 'name', 'calories']]));
    })
    .then(result => {
      console.log(result)
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
