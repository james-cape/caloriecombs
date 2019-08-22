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
    let food_1 = await Food.create({
        "id": 1,
        "name": "Banana",
        "calories": 150
      });

    let food_2 = await Food.create({
        "id": 2,
        "name": "Bagel Bites - Four Cheese",
        "calories": 650
      });

    let food_3 = await Food.create({
        "id": 3,
        "name": "Chicken Burrito",
        "calories": 800
      });

    let food_6 = await Food.create({
        "id": 6,
        "name": "Yogurt",
        "calories": 550
      });

    let food_9 = await Food.create({
        "id": 9,
        "name": "Gum",
        "calories": 50
      });

    let food_10 = await Food.create({
        "id": 10,
        "name": "Cheese",
        "calories": 400
      });

    let food_12 = await Food.create({
        "id": 12,
        "name": "Apple",
        "calories": 220
      });

    let meal_1 = await Meal.create({ name: 'Breakfast' });
    let meal_2 = await Meal.create({ name: 'Snack' });
    let meal_3 = await Meal.create({ name: 'Lunch' });
    let meal_4 = await Meal.create({ name: 'Dinner' });

    

    return request(app).get('/api/v1/meals')
    .then(response => {
      expect(response.status).toBe(200),
      expect(response.body).toStrictEqual(
        [
          {
            "id": 1,
            "name": "Breakfast",
            "foods": [
              {
                "id": 1,
                "name": "Banana",
                "calories": 150
              },
              {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
              },
              {
                "id": 12,
                "name": "Apple",
                "calories": 220
              }
            ]
          },
          {
            "id": 2,
            "name": "Snack",
            "foods": [
              {
                "id": 1,
                "name": "Banana",
                "calories": 150
              },
              {
                "id": 9,
                "name": "Gum",
                "calories": 50
              },
              {
                "id": 10,
                "name": "Cheese",
                "calories": 400
              }
            ]
          },
          {
            "id": 3,
            "name": "Lunch",
            "foods": [
              {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
              },
              {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
              },
              {
                "id": 12,
                "name": "Apple",
                "calories": 220
              }
            ]
          },
          {
            "id": 4,
            "name": "Dinner",
            "foods": [
              {
                "id": 1,
                "name": "Banana",
                "calories": 150
              },
              {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
              },
              {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
              }
            ]
          }
        ]
      )
    })
  })
  //
  // test('Test GET /api/v1/meals path', async () => {
  //   let food_1 = await Food.create(
  //     {
  //     name: 'banana',
  //     calories: 150
  //   });
  //
  //   let food_2 = await Food.create(
  //     {
  //     name: 'mushroom',
  //     calories: 105
  //   });
  //
  //   let food_3 = await Food.create(
  //     {
  //     name: 'salmon',
  //     calories: 175
  //   });
  //
  //   let food_4 = await Food.create(
  //     {
  //     name: 'peanut butter',
  //     calories: 195
  //   });
  //
  //   let meal_1 = await Meal.create(
  //     {
  //     name: 'sandwich_1'
  //   });
  //
  //   let meal_2 = await Meal.create(
  //     {
  //     name: 'sandwich_2'
  //   });
  //
  //   return request(app).get('/api/v1/meals')
  //   .then(response => {
  //     console.log(response.body)
  //     expect(response.status).toBe(200),
  //     expect(response.body).toStrictEqual(
  //       [{
  //         "id": 1,
  //         "name": "sandwich_1"
  //       },
  //       {
  //         "id": 2,
  //         "name": "sandwich_2"
  //       }
  //       ]
  //     )
  //   })
  // })
})
