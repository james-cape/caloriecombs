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

    return request(app).get('/api/v1/meals')
    .then(response => {
      expect(response.status).toBe(200),
      expect(response.body).toEqual( [{"Food": [{"calories": 150, "id": 1, "name": "Banana"}, {"calories": 550, "id": 6, "name": "Yogurt"}, {"calories": 220, "id": 12, "name": "Apple"}], "id": 1, "name": "Breakfast"}, {"Food": [{"calories": 150, "id": 1, "name": "Banana"}, {"calories": 50, "id": 9, "name": "Gum"}, {"calories": 400, "id": 10, "name": "Cheese"}], "id": 2, "name": "Snack"}, {"Food": [{"calories": 650, "id": 2, "name": "Bagel Bites - Four Cheese"}, {"calories": 800, "id": 3, "name": "Chicken Burrito"}, {"calories": 220, "id": 12, "name": "Apple"}], "id": 3, "name": "Lunch"}, {"Food": [{"calories": 150, "id": 1, "name": "Banana"}, {"calories": 650, "id": 2, "name": "Bagel Bites - Four Cheese"}, {"calories": 800, "id": 3, "name": "Chicken Burrito"}], "id": 4, "name": "Dinner"}])
    });
  });

  describe('Test POST /api/v1/meals/:meal_id/foods/:id path', async () => {
    beforeEach(() => {
      cleanup()
    });

    test('it adds food to meal and returns a message', async () => {
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

      let meal_1 = await Meal.create({ id: 1, name: 'Breakfast' });
      let meal_2 = await Meal.create({ id: 2, name: 'Snack' });

      let mealfood_1 =  await MealFood.create({foodId: 1,  mealId: 1})
      let mealfood_2 =  await MealFood.create({foodId: 1,  mealId: 2})
      return meal_1.hasFood(food_2).then(result => {
        expect(result).toBe(false)
      })
      return meal_2.hasFood(food_2).then(result => {
        expect(result).toBe(false)
      })

      return request(app).post('/api/v1/meals/1/foods/2')
      .then(response => {
        expect(response.status).toBe(200),
        expect(response.body).toEqual(
          {
            "message": "Successfully added Bagel Bites - Four Cheese to Breakfast"
          }
        )
        return meal_1.hasFood(food_2).then(result => {
          expect(result).toBe(true)
        })
        return meal_2.hasFood(food_2).then(result => {
          expect(result).toBe(false)
        })
      });
    });

    test('errors when food not found', async () => {
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

      let meal_1 = await Meal.create({ id: 1, name: 'Breakfast' });
      let mealfood_1 =  await MealFood.create({foodId: 1,  mealId: 1})

      return request(app).post('/api/v1/meals/1/foods/3')
      .then(response => {
        expect(response.status).toBe(500),
        expect(response.body).toEqual({"error": "Food not found"})
      });
    });

    test('errors when meal not found', async () => {
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

      let meal_1 = await Meal.create({ id: 1, name: 'Breakfast' });
      let mealfood_1 =  await MealFood.create({foodId: 1,  mealId: 1})

      return request(app).post('/api/v1/meals/4/foods/2')
      .then(response => {
        expect(response.status).toBe(500),
        expect(response.body).toEqual({"error": "Meal not found"})
      });
    });

    test('errors when meal already has that food', async () => {
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

      let meal_1 = await Meal.create({ id: 1, name: 'Breakfast' });
      let mealfood_1 =  await MealFood.create({foodId: 1,  mealId: 1})

      return request(app).post('/api/v1/meals/1/foods/1')
      .then(response => {
        expect(response.status).toBe(500),
        expect(response.body).toEqual({"error": "Meal already has that food"})
      });
    });
  });
});
