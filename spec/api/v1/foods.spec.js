var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../app');

describe('Foods API', () => {
  // beforeAll(() => {
  //   shell.exec('npx sequelize db:drop')
  //   shell.exec('npx sequelize db:create')
  // });
  // beforeEach(() => {
  //   shell.exec('npx sequelize db:migrate')
  //   shell.exec('npx sequelize db:seed')
  // });
  // afterAll(() => {
  //   shell.exec('npx sequelize db:drop')
  // })
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });
  afterAll(() => {
    shell.exec('npx sequelize db:drop')
  });

  test('Test GET /api/v1/foods path', () => {
    return request(app).get('/api/v1/foods')
    .then(response => {
      expect(response.status).toBe(200),
      expect(response.body).toBe(
        [{
          "id": 1,
          "name": "banana",
          "calories": 150
        },
        {
          "id": 2,
          "name": "mushroom",
          "calories": 105
        },
        {
          "id": 3,
          "name": "salmon",
          "calories": 175
        },
        {
          "id": 4,
          "name": "peanut butter",
          "calories": 195
        }]
      )
    })
  })
})
