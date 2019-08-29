var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var cleanup = require('../../helper/testCleanup');

describe('Edamam Microservice API Analyses', () => {

  beforeEach(() => {
    cleanup()
  });

  test('Test GET /api/v1/recipes/calories path', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/calories?q=banana')
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([{"avg": 2628.07362670898}]);
    })
  })

  test('Test bad GET /api/v1/recipes/calories path with no q param', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/calories')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "Include food in query"});
    })
  })

  test('Test GET /api/v1/recipes/max_yield path', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/max_yield?q=banana')
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({"max_yield": 18});
    })
  })

  test('Test bad GET /api/v1/recipes/max_yield path with no q param', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/max_yield')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "Include food in query"});
    })
  })


})
