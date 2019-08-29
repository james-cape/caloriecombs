var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');
var cleanup = require('../../helper/testCleanup');

describe('Edamam Microservice API', () => {

  beforeEach(() => {
    cleanup()
  });

  test('Test GET /api/v1/recipes/food_search path', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/food_search?q=banana')
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

  test('Test bad GET /api/v1/recipes/food_search path with no q param', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/food_search')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "Include food in query"});
    })
  })

  test('Test GET /api/v1/recipes/servings path', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/servings?q=4')
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(4);
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

  test('Test bad GET /api/v1/recipes/servings path with no q param', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/servings')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "Include servings in query"});
    })
  })

  test('Test bad GET /api/v1/recipes/servings path no match for that quantity', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/servings?q=2000')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "No matches found for that number"});
    })
  })

  test('Test GET /api/v1/recipes/weight path', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/weight?min=500&max=900')
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(24);
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

  test('Test bad GET /api/v1/recipes/weight path with no max or min param', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/weight')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "Include max and min weight in query"});
    })
  })

  test('Test bad GET /api/v1/recipes/weight path with no min param', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/weight?max=500')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "Include max and min weight in query"});
    })
  })

  test('Test bad GET /api/v1/recipes/weight path with no max param', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/weight?min=500')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "Include max and min weight in query"});
    })
  })

  test('Test bad GET /api/v1/recipes/weight path no match for that quantity', async () => {
    return request('https://edamamservice.herokuapp.com').get('/api/v1/recipes/weight?min=70000&max=70001')
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({"error": "No matches found for that weight range"});
    })
  })
})
