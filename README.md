# Exercise Tracker

This project is my solution for [Back End Development and APIs - Exercise
Tracker](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker) and it's a part of APIs and Microservices Certification by
[freeCodeCamp]( https://www.freecodecamp.org/).

## freeCodeCamp tests Requirements
:heavy_check_mark: You should provide your own project, not the example URL.
:heavy_check_mark: You can POST to /api/users with form data username to create a new user.
:heavy_check_mark: The returned response from POST /api/users with form data username will be an object with username and _id properties.
:heavy_check_mark: You can make a GET request to /api/users to get a list of all users.
:heavy_check_mark: The GET request to /api/users returns an array.
:heavy_check_mark: Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.
:heavy_check_mark: You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
:heavy_check_mark: The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
:heavy_check_mark: You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
:heavy_check_mark: A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.
:heavy_check_mark: A GET request to /api/users/:id/logs will return the user object with a log array of all the exercises added.
:heavy_check_mark: Each item in the log array that is returned from GET /api/users/:id/logs is an object that should have a description, duration, and date properties.
:heavy_check_mark: The description property of any object in the log array that is returned from GET /api/users/:id/logs should be a string.
:heavy_check_mark: The duration property of any object in the log array that is returned from GET /api/users/:id/logs should be a number.
:heavy_check_mark: The date property of any object in the log array that is returned from GET /api/users/:id/logs should be a string.. Use the dateString format of the Date API.
:heavy_check_mark: You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.

## Installation

### MongoDB Atlas

Use your existing account or create a new one. If you don't know how to do that,
you can follow
[step by step tutorial by freeCodeCamp](https://www.freecodecamp.org/learn/apis-and-microservices/mongodb-and-mongoose/).

Once you have connected to your cluster, use `.sample.env` to create your `.env`
file.

```env
MONGO_URI_PROD=mongodb+srv://<user>:<password>@<cluster#-dbname>.mongodb.net/test

MONGO_URI_DEV=mongodb://localhost:27017/<db_name>
```

```bash
$ npm install
```

### Start the server

```bash
$ npm start
```
