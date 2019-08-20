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

module.exports = router;
