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
        return meal.addFood(food_1).then(() => {
          return meal.hasFood(food_1).then(result => {
            return meal.getFood().then((result) => {
              expect(result[0].dataValues.name).toBe('peanut butter');
              return meal.addFood(food_2).then(() => {
                return meal.getFood().then((result) => {
                  expect(result.length).toBe(2);
                  expect(result[0].dataValues.name).toBe('peanut butter');
                  expect(result[1].dataValues.name).toBe('turkey');
                })
              })
            })
          })
        })
      })
      .then(mealfood => {
        expect(meal.name).toBe("dinner");
      })
    });
  });

  test('it has no food duplicates', async () => {
    let food_1 = await Food.create(
      {
        name: 'peanut butter',
        calories: 195
      });

    return Meal.create({
      name: "dinner"
    })
    .then(meal => {
      return meal.addFood(food_1).then(() => {
        return meal.addFood(food_1).then(() => {
          return meal.getFood().then((result) => {
            expect(result.length).toBe(1);
          })
        })
      })
    });
  });

  // Test unique foods. Test unique meal names. Test meal name must exist.
});
