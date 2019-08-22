var shell = require('shelljs');
var request = require("supertest");
var express = require("express");

var Food = require('../../models').Food;
var Meal = require('../../models').Meal;
var MealFood = require('../../models').MealFood;
var cleanup = require('../helper/testCleanup');

describe('model test', () => {
  beforeEach(() => {
    cleanup()
  });

  test('it has attributes', async () => {
    let food_1 = await Food.create(
      {
        name: 'peanut butter',
        calories: 195
      });

    let food_2 = await Food.create(
      {
        name: 'turkey',
        calories: 111
      });


    return Meal.create({
      name: "dinner"
    })
    .then(meal => {
      return meal.hasFood(food_1)
      .then(result => {
        expect(result).toBe(false)
        // console.log(result)

        return meal.addFood(food_1).then(() => {
          return meal.hasFood(food_1).then(result => {
            return meal.getFood().then((result) => {
              console.log('hello XXXXXXXXXXXXXX');
              console.log(result[0].dataValues.name)
              expect(result[0].dataValues.name)toBe('peanut butter')
            })
            // console.log(meal.getFood())
          })
        })
      })
      // .create({
      //   mealId: meal.id,
      //   foodId: food_1.id
      // })
      .then(mealfood => {
        expect(meal.name).toBe("dinner");
      })
      // .catch(error => {
      //   console.log(error)
      // })
      // meal.addFoods([food_1, food_2])
      // console.log(meal)
      // expect(meal.foods).toStrictEqual([food_1, food_2]);
    });
  //
  // test('it has other attributes', async () => {
  //   await Meal.create({
  //     name: "soup",
  //     calories: 100
  //   })
  //   .then(food => {
  //     expect(food.name).toBe("soup");
  //     expect(food.calories).toBe(100);
  //   });
  // });
  //
  // test('calories cannot be negative', async () => {
  //   await Meal.create({
  //     name: "coffee",
  //     calories: -100
  //   })
  //   .catch(food => {
  //     expect(food.name).toBe("SequelizeUniqueConstraintError");
  //   });
  // });
  //
  // test('calories can equal zero', async () => {
  //   await Meal.create({
  //     name: "celery",
  //     calories: 0
  //   })
  //   .then(food => {
  //     expect(food.calories).toBe(0);
  //   })
  // });
  //
  // test('it cannot already exist', async () => {
  //   await Meal.create({
  //     name: "celery",
  //     calories: 0
  //   })
  //   .catch(food => {
  //     expect(food.name).toBe("SequelizeUniqueConstraintError");
  //   })
  // });
});
});
