var shell = require('shelljs');
var request = require("supertest");
var express = require("express");

var Food = require('../../models').Food;
var Meal = require('../../models').Meal;
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


    await Meal.create({
      name: "dinner",
      foods: [food_1, food_2]
    })
    .then(meal => {
      console.log(meal)
      expect(meal.name).toBe("dinner");
      expect(meal.foods[0]).toStrictEqual(food_1);
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
