var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var cleanup = require('../../helper/testCleanup');

describe('Edamam Microservice API', () => {

  beforeEach(() => {
    cleanup()
  });

  test('Test GET /api/v1/food_search path', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/food_search?q=banana')
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(20);
      return(response.body[0])
    })
    .then(recipe => {
      expect.objectContaining(
        {
          id: expect.any(Number),
          label: expect.any(String),
          image: expect.any(String),
          url: expect.any(String),
          yield: expect.any(Number),
          calories: expect.any(Number),
          totalWeight: expect.any(Number),
          food: expect.any(String)
        }
      )
    })
  })

  test('Test bad GET /api/v1/food_search path with no q param', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/food_search')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "Include food in query"});
    })
  })
})
