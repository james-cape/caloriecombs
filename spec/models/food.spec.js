var shell = require('shelljs');
var request = require("supertest");
var Food = require('../../models').Food;

describe('model test', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      // shell.exec('npx sequelize db:seed:all')
    });
  // afterEach(() => {
  //   shell.exec('npx sequelize db:migrate:undo:all')
  // });

  test('it has attributes', async () => {
    await Food.create({
      name: "cereal",
      calories: 260
    })
    .then(food => {
      expect(food.name).toBe("cereal");
      expect(food.calories).toBe(260);
    });
  });

  test('it has other attributes', async () => {
    await Food.create({
      name: "soup",
      calories: 100
    })
    .then(food => {
      expect(food.name).toBe("soup");
      expect(food.calories).toBe(100);
    });
  });

  test('calories cannot be negative', async () => {
    await Food.create({
      name: "coffee",
      calories: -100
    })
    .catch(food => {
      console.log(food);
      expect(food.name).toBe("SequelizeUniqueConstraintError");
    });
  });

  test('calories can equal zero', async () => {
    await Food.create({
      name: "celery",
      calories: 0
    })
    .then(food => {
      console.log(food);
      expect(food.calories).toBe(0);
    })
  });

  test('it cannot already exist', async () => {
    await Food.create({
      name: "celery",
      calories: 0
    })
    .catch(food => {
      expect(food.name).toBe("SequelizeUniqueConstraintError");
    })
  });
});
