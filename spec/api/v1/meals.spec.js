var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var cleanup = require('../../helper/testCleanup');

describe('Meals API', () => {

  beforeEach(() => {
    cleanup()
  });

  test('Test GET /api/v1/meals path', async () => {
    let food_1 = await Food.create(
      {
      name: 'banana',
      calories: 150
    });

    let food_2 = await Food.create(
      {
      name: 'mushroom',
      calories: 105
    });

    let food_3 = await Food.create(
      {
      name: 'salmon',
      calories: 175
    });

    let food_4 = await Food.create(
      {
      name: 'peanut butter',
      calories: 195
    });

    let meal_1 = await Meal.create(
      {
      name: 'sandwich_1',
      foods: [food_1, food_2, food_3]
    });

    let meal_2 = await Meal.create(
      {
      name: 'sandwich_2',
      foods: [food_2, food_3, food_4]
    });



    return request(app).get('/api/v1/meals')
    .then(response => {
      console.log(response.body)
      expect(response.status).toBe(200),
      expect(response.body).toStrictEqual(
        [{
          "id": 1,
          "name": "sandwich_1",
          "foods": meal_1.foods
        },
        {
          "id": 2,
          "name": "sandwich_2",
          "foods": meal_2.foods
        }
        ]
      )
    })
  })
})
