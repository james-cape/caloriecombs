# CALORIECOMBS

Welcome to Caloriecombs, an API with corresponding microservice created by James Cape and Brian Plantico at the Turing School of Software and Design. Caloriecombs is built using Express (version 4.16.4) for Node.js (version 10.16.2) and also utilizes an ORM (Sequelize version 5.5.0) to interact with a Postgres database. Caloriecombs stores food and meal information which originates from our aptly named 'Edamam microservice' (https://github.com/james-cape/edamame_service) which consumes the third party Edamam API `/recipes` endpoint (https://developer.edamam.com/edamam-docs-recipe-api). The endpoints which you can access are outlined below with examples of successful requests and successful responses, however, if you have any questions about this API, please reach out to us directly.

Production Link:
https://afternoon-mesa-16147.herokuapp.com

#### James Cape: https://github.com/james-cape
#### Brian Plantico: https://github.com/bplantico

### Schema
Caloriecombs' database currently has three tables: Food, Meals, and MealFoods.
![Caloriecombs DB Schema](https://user-images.githubusercontent.com/43261385/63906428-515ad580-ca07-11e9-838b-1f042dba4e48.png)

### Setup and Configuration


Caloriecombs provides nine API endpoints to interact with:
#### Foods
+ [All Foods Request](#all_foods)
+ [One Food Request](#one_food)
+ [Update Food Request](#update_food)
+ [Add a Food Request](#add_food)
+ [Delete a Food Request](#delete_food)
#### Meals
+ [All Meals Request](#all_meals)
+ [One Meal Request](#one_meal)
+ [Add Food to Meal Request](#add_food_to_meal)
+ [Delete Food from a Meal Request](#delete_food_from_a_meal)

# Configuration
It's not necessary to install and run Caloriecombs or the Edamam Microservice on your local machine since the application is deployed to Heroku and the endpoints outlined below can be accessed without running the application locally, however, if you're interested in working on the code base the following instructions will help you get started:

Fork and/or clone this repository to your local machine.

`cd` into the `caloriecombs` directory and run `npm install` from your command line.

To set up the database, run `npx sequelize db:create` then `npx sequelize db:migrate`

Inside of the root Caloriecombs file, create a `.env` file. You will need to add your :

```
DB_USERNAME=<your db username here>
DB_NAME_DEV=<the name you would like to set as your dev db here>
DB_NAME_TEST=<the name you would like to set as your test db here>
DB_NAME_PROD=<the name you would like to set as your production db here>
```

You're ready to go! Reach out if you have any other questions or concerns.


# <a name="all_foods"></a>All Foods Request
`https://afternoon-mesa-16147.herokuapp.com/api/v1/foods`

A GET request to the foods endpoint returns a JSON object of all of the foods currently stored in the database. Each food object has an id, name, calories, and createdAt/updatedAt timestamps.

Example Request
```
GET https://afternoon-mesa-16147.herokuapp.com/api/v1/foods
```
Example Response
```
Status: 200 OK
[
    {
        "id": 1,
        "name": "banana",
        "calories": 150,
        "createdAt": "2019-08-26T02:51:06.058Z",
        "updatedAt": "2019-08-26T02:51:06.058Z"
    },
    {
        "id": 2,
        "name": "mushroom",
        "calories": 105,
        "createdAt": "2019-08-26T02:51:06.058Z",
        "updatedAt": "2019-08-26T02:51:06.058Z"
    },
    {
        "id": 3,
        "name": "salmon",
        "calories": 175,
        "createdAt": "2019-08-26T02:51:06.058Z",
        "updatedAt": "2019-08-26T02:51:06.058Z"
    },
    {
        "id": 4,
        "name": "peanut butter",
        "calories": 195,
        "createdAt": "2019-08-26T02:51:06.058Z",
        "updatedAt": "2019-08-26T02:51:06.058Z"
    }
]
```

# <a name="one_food"></a>One Food Request
`https://afternoon-mesa-16147.herokuapp.com/api/v1/foods/[:food_id]`

A GET request to the one food endpoint takes a parameter of a `:food_id` and returns the food with that id if it exists.

Example Request
```
GET https://afternoon-mesa-16147.herokuapp.com/api/v1/foods/[:food_id]
```
Example Response
```
Status: 200 OK
{
    "id": 1,
    "name": "banana",
    "calories": 150,
    "createdAt": "2019-08-26T02:51:06.058Z",
    "updatedAt": "2019-08-26T02:51:06.058Z"
}
```

# <a name="update_food"></a>Update Food Request
`https://afternoon-mesa-16147.herokuapp.com/api/v1/foods/[:food_id]`

A PATCH request to the update food endpoint takes a food_id in the path and an object with a key of food pointing to another object containing keys of name and/or calories and updates the food with that ID to be the new attributes.

Example Request
```
PATCH https://afternoon-mesa-16147.herokuapp.com/api/v1/foods/4

{
	"food": {
        "name": "Ham",
        "calories": 300
      }
}
```
Example response
```
Status: 200 OK
{
    "id": 4,
    "name": "Tree Ham",
    "calories": 300,
    "createdAt": "2019-08-29T13:24:24.981Z",
    "updatedAt": "2019-08-29T13:35:43.274Z"
}
```

# <a name="add_food"></a>Add a Food
`https://afternoon-mesa-16147.herokuapp.com/api/v1/foods/`

A POST request to `/foods` takes a body with an object of a key `"food":` pointing to another object with keys of `"name"` and `"calories"` in the request body. Both the name and calories keys are required to create a new food record.

Example Request
```
POST https://afternoon-mesa-16147.herokuapp.com/api/v1/foods/

{
	"food": {
        "name": "Bagel",
        "calories": 200
      }
}
 ```
Example Response
```
Status: 201 Created
{
    "id": 4,
    "name": "Bagel",
    "calories": 200,
    "createdAt": "2019-08-29T13:24:24.981Z",
    "updatedAt": "2019-08-29T13:35:43.274Z"
}
```

# <a name="delete_food"></a>Delete a Food
`https://afternoon-mesa-16147.herokuapp.com/api/v1/foods/4`

A DELETE request to `/foods/:food_id` doesn't take any other params or body. It responds with a `204` status code to indicate no content.

Example Request
```
DELETE https://afternoon-mesa-16147.herokuapp.com/api/v1/foods/4
```

Example response:
```
Status code: 204 No content
```

# <a name="all_meals"></a>All Meals
`https://afternoon-mesa-16147.herokuapp.com/api/v1/meals`

The meals endpoint receives a GET request to the `/meals` endpoint and responds with an object containing all of the meals and their associated foods.

Example Request
```
GET https://afternoon-mesa-16147.herokuapp.com/api/v1/meals
```

Example response
```
Status: 200 OK
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
```

# <a name="one_meal"></a>One Meal
`https://afternoon-mesa-16147.herokuapp.com/api/v1/meals/:meal_id`

A GET request to the `/meals/:meal_id` endpoint shows the meal with that id along with its associated foods.

Example Request
```
GET https://afternoon-mesa-16147.herokuapp.com/api/v1/meals/3
```

Example response
```
Status: 200 OK
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
}
```

# <a name="add_food_to_meal"></a>Add Food to Meal Request
`https://afternoon-mesa-16147.herokuapp.com/api/v1/meals/:meal_id/foods/`


A POST request to the `/meals/:meal_id/foods/` endpoint asscoiates a food to the meal with that id.

Example Request
```
POST https://afternoon-mesa-16147.herokuapp.com/api/v1/meals/3/foods/
```

Example response
```
Status: 201 Created
{
    "message": "Successfully added FOODNAME to MEALNAME"
}
```

# <a name="delete_food_from_a_meal"></a>Delete Food From a Meal Request
`https://afternoon-mesa-16147.herokuapp.com/api/v1/meals/:meal_id/foods/1`


A DELETE request to the `/meals/:meal_id/foods/:food_id` endpoint deletes the asscoiation between the food and meal with the corresponding id's.

Example Request
```
DELETE https://afternoon-mesa-16147.herokuapp.com/api/v1/meals/3/foods/1
```

Example response
```
Status: 204 No content.
```
