var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFood = require('../../../models').MealFood;


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

    let meal_1 = await Meal.create({ id: 1, name: 'Breakfast' });
    let meal_2 = await Meal.create({ id: 2, name: 'Snack' });
    let meal_3 = await Meal.create({ id: 3, name: 'Lunch' });
    let meal_4 = await Meal.create({ id: 4, name: 'Dinner' });

    let mealfood_1 =  await MealFood.create({foodId: 1,  mealId: 1})
    let mealfood_2 =  await MealFood.create({foodId: 6,  mealId: 1})
    let mealfood_3 =  await MealFood.create({foodId: 12, mealId: 1})
    let mealfood_4 =  await MealFood.create({foodId: 1,  mealId: 2})
    let mealfood_5 =  await MealFood.create({foodId: 9,  mealId: 2})
    let mealfood_6 =  await MealFood.create({foodId: 10, mealId: 2})
    let mealfood_7 =  await MealFood.create({foodId: 2,  mealId: 3})
    let mealfood_8 =  await MealFood.create({foodId: 3,  mealId: 3})
    let mealfood_9 =  await MealFood.create({foodId: 12, mealId: 3})
    let mealfood_10 = await MealFood.create({foodId: 1,  mealId: 4})
    let mealfood_11 = await MealFood.create({foodId: 2,  mealId: 4})
    let mealfood_12 = await MealFood.create({foodId: 3,  mealId: 4})

    // await meal_1.getFood()
    // .then((result) => {
    //   expect(result.length).toBe(3);
    //   // expect(result[0].dataValues.name).toBe('peanut butter');
    //   // expect(result[1].dataValues.name).toBe('turkey');
    // })

    return request(app).get('/api/v1/meals')
    .then(response => {
      expect(response.status).toBe(200),
      expect(response.body).toEqual( "hello"
        // [
        //   {
        //     "id": 1,
        //     "name": "Breakfast",
        //     "foods": [
        //       {
        //         "id": 1,
        //         "name": "Banana",
        //         "calories": 150
        //       },
        //       {
        //         "id": 6,
        //         "name": "Yogurt",
        //         "calories": 550
        //       },
        //       {
        //         "id": 12,
        //         "name": "Apple",
        //         "calories": 220
        //       }
        //     ]
        //   },
        //   {
        //     "id": 2,
        //     "name": "Snack",
        //     "foods": [
        //       {
        //         "id": 1,
        //         "name": "Banana",
        //         "calories": 150
        //       },
        //       {
        //         "id": 9,
        //         "name": "Gum",
        //         "calories": 50
        //       },
        //       {
        //         "id": 10,
        //         "name": "Cheese",
        //         "calories": 400
        //       }
        //     ]
        //   },
        //   {
        //     "id": 3,
        //     "name": "Lunch",
        //     "foods": [
        //       {
        //         "id": 2,
        //         "name": "Bagel Bites - Four Cheese",
        //         "calories": 650
        //       },
        //       {
        //         "id": 3,
        //         "name": "Chicken Burrito",
        //         "calories": 800
        //       },
        //       {
        //         "id": 12,
        //         "name": "Apple",
        //         "calories": 220
        //       }
        //     ]
        //   },
        //   {
        //     "id": 4,
        //     "name": "Dinner",
        //     "foods": [
        //       {
        //         "id": 1,
        //         "name": "Banana",
        //         "calories": 150
        //       },
        //       {
        //         "id": 2,
        //         "name": "Bagel Bites - Four Cheese",
        //         "calories": 650
        //       },
        //       {
        //         "id": 3,
        //         "name": "Chicken Burrito",
        //         "calories": 800
        //       }
        //     ]
        //   }
        // ]
      )
    });
  });
});
