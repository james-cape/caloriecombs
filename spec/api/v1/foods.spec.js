var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var Food = require('../../../models').Food;
var cleanup = require('../../helper/testCleanup');

describe('Foods API', () => {

  beforeEach(() => {
    cleanup()
  });

  test('Test GET /api/v1/foods path', async () => {
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

    return request(app).get('/api/v1/foods')
    .then(response => {
      expect(response.status).toBe(200),
      expect(response.body).toStrictEqual(
        [
          {
            "calories": food_1.calories,
            "createdAt": `${food_1.createdAt.toISOString()}`,
            "id": food_1.id,
            "name": food_1.name,
            "updatedAt": `${food_1.updatedAt.toISOString()}`
          },
          {
            "calories": food_2.calories,
            "createdAt": `${food_2.createdAt.toISOString()}`,
            "id": food_2.id,
            "name": food_2.name,
            "updatedAt": `${food_2.updatedAt.toISOString()}`
          },
          {
            "calories": food_3.calories,
            "createdAt": `${food_3.createdAt.toISOString()}`,
            "id": food_3.id,
            "name": food_3.name,
            "updatedAt": `${food_3.updatedAt.toISOString()}`
          },
          {
            "calories": food_4.calories,
            "createdAt": `${food_4.createdAt.toISOString()}`,
            "id": food_4.id,
            "name": food_4.name,
            "updatedAt": `${food_4.updatedAt.toISOString()}`
          }
        ]
      )
    })
  })

  test('Test GET /api/v1/foods/:id path', async () => {
    let food_1 = await Food.create(
      {
      name: 'banana',
      calories: 150
    });

    let food_3 = await Food.create(
      {
      name: 'salmon',
      calories: 175
    });

    return request(app).get(`/api/v1/foods/${food_3.id}`)
    .then(response => {
      expect(response.status).toBe(200),
      expect(response.body).toStrictEqual(
        {
          "calories": food_3.calories,
          "createdAt": `${food_3.createdAt.toISOString()}`,
          "id": food_3.id,
          "name": food_3.name,
          "updatedAt": `${food_3.updatedAt.toISOString()}`
        }
      )
    })
  })

  test('Test catch GET /api/v1/foods/:id path', async () => {
    let food_1 = await Food.create(
      {
      name: 'cake',
      calories: 350
    });

    let food_3 = await Food.create(
      {
      name: 'donut',
      calories: 185
    });

    return request(app).get(`/api/v1/foods/a`)
    .then(response => {
      expect(response.status).toBe(500),
      expect(Object.keys(response.body)).toEqual(["error"]);
    })
  })
})
