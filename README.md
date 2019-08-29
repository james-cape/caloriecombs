# CALORIECOMBS

Welcome to Caloriecombs, an API with corresponding microservice created by James Cape and Brian Plantico at the Turing School of Software and Design. Caloriecombs is built using Express (version 4.16.4) for Node.js (version 10.16.2) and also utilizes an ORM (Sequelize version 5.5.0) to interact with a Postgres database. Caloriecombs stores food and meal information which originates from our aptly named 'Edamam microservice' (https://github.com/james-cape/edamame_service) which consumes the third party Edamam API `/recipes` endpoint (https://developer.edamam.com/edamam-docs-recipe-api). The endpoints which you can access are outlined below with examples of successful requests and successful responses, however, if you have any questions about this API, please reach out to us directly.

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
{
    "id": 1,
    "name": "banana",
    "calories": 150,
    "createdAt": "2019-08-26T02:51:06.058Z",
    "updatedAt": "2019-08-26T02:51:06.058Z"
}
```

# <a name="update_food"></a>Update Food Request
`http://the-real-sweater-weather.herokuapp.com/api/v1/munchies?start=[location]&end=[location]&food=[food_type]`

A POST request to the update food endpoint takes a food id param in 

## Example Request
```
GET http://the-real-sweater-weather.herokuapp.com/api/v1/munchies?start=boulder,co&end=denver,co&food=indian

{
    "city": "Denver",
    "restaurants": [
        {
            "name": "Biju's Little Curry Shop",
            "address": "1441 26th St"
        },
        {
            "name": "Spice Room | Neighborhood Indian Bistro",
            "address": "3157 W 38th Ave"
        },
        {
            "name": "Mehak India's Aroma",
            "address": "250 Steele St"
        }
    ]
}
```

# <a name="add_food"></a>Add a Food
`http://the-real-sweater-weather.herokuapp.com/api/v1/gifs?location=denver,co`

A gifs request takes one location parameter and responds with five objects that represent forecasts. Each forecast contains a day timestamp (unix), a summary of the weather for that day, and a gif url based on the location and weather summary for that day.

## Example Request
```
GET http://the-real-sweater-weather.herokuapp.com/api/v1/gifs?location=[location]

{
    "data": {
        "images": [
            {
                "time": "1565071200",
                "summary": "Foggy in the morning.",
                "url": "https://media0.giphy.com/media/3o7rbT3ECCXdEGE8fu/giphy.gif?cid=0e5cb8495d49d16575724b6659eb204d&rid=giphy.gif"
            },
            {
                "time": "1565157600",
                "summary": "Possible drizzle in the evening.",
                "url": "https://media0.giphy.com/media/RIlEe3erqB5Qch1PXe/giphy.gif?cid=0e5cb8495d49d16575724b6659a00d2f&rid=giphy.gif"
            },
            {
                "time": "1565244000",
                "summary": "Possible light rain in the evening.",
                "url": "https://media2.giphy.com/media/12slQrvE9rsu1q/giphy.gif?cid=0e5cb8495d49d16575724b6659d03acc&rid=giphy.gif"
            },
            {
                "time": "1565330400",
                "summary": "Possible light rain in the evening.",
                "url": "https://media2.giphy.com/media/12slQrvE9rsu1q/giphy.gif?cid=0e5cb8495d49d16575724b6659d03acc&rid=giphy.gif"
            },
            {
                "time": "1565416800",
                "summary": "Mostly cloudy throughout the day.",
                "url": "https://media3.giphy.com/media/YdUdx8jPIKhxe/giphy.gif?cid=0e5cb8495d49d1666a32724e41565116&rid=giphy.gif"
            }
        ],
        "copyright": "2019"
    }
 ```

# <a name="delete_food"></a>Delete a Food
`http://the-real-sweater-weather.herokuapp.com/api/v1/users`

The users endpoint receives a post request with three parameters 1) an `email` address, 2) a `password`, and 3) a `password_confirmation`. If the email address has not already been used to create an account and the password and password_confirmations match, then an account is created for the user and the API responds with an API key.

If the email address provided matches an address already in the database and the passwords match the corresponding password, the user receives their API key in response.

If the email address provided matches an address already in the database but the passwords don't match or don't match the user's password, the response is an error message.

## Example Request
```
POST http://the-real-sweater-weather.herokuapp.com/api/v1/users?email=example@email.com&password=examplepassword&password_confirmation=examplepassword

Example response:
{
    "api_key": "sb1fnjXyRebyiABZFkpGhw"
}
```

# <a name="all_meals"></a>All Meals
`http://the-real-sweater-weather.herokuapp.com/api/v1/sessions`

The sessions endpoint receives a post request with two parameters 1) an `email` address, 2) a `password`. If the email address provided matches an address already in the database and the passwords match the corresponding password, the user receives their API key in response.

If the email address provided matches an address already in the database but the password doesn't match the user's password, the response is an error message.

## Example Request
```
POST http://the-real-sweater-weather.herokuapp.com/api/v1/sessions?email=example@email.com&password=examplepassword

Example response:
{
    "api_key": "sb1fnjXyRebyiABZFkpGhw"
}
```

# <a name="one_meal"></a>One Meal
`http://the-real-sweater-weather.herokuapp.com/api/v1/road_trip?origin=[location]&destination=[location]&api_key=[api key]`

The roadtrip endpoint receives a `POST` request with three parameters, 1) an `origin` location, 2) a `destination` location, and 3) an `api_key`. If the api key is active, the response is a JSON 1.0 object which includes a summary of the weather at the time of arrival to the destination and includes the temperature and estimated travel time (in seconds).

## Example Request
```
POST http://the-real-sweater-weather.herokuapp.com/api/v1/road_trip?origin=denver,co&destination=loveland,co&api_key=FKSir1ILCmVjv_Mu6tI7Uw

Example response:
{
    "data": {
        "id": "1565123879_7",
        "type": "road_trip",
        "attributes": {
            "summary": "Partly Cloudy",
            "temperature": 93.14,
            "est_travel_time": 3566
        }
    }
}
```



Heroku link:
https://afternoon-mesa-16147.herokuapp.com
