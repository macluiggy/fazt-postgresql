var express = require("express");
//model
var User = require("../models/user.model");
var { Session } = require("../models/session.model");
var router = express.Router();
//controllers

var { create, getAllUsers } = require("../controllers/user.controller");
var {
  addExercise,
  showExercises,
} = require("../controllers/session.controllers");

router.route("/api/users").post(create).get(getAllUsers);

router.route("/api/users/:_id/exercises").post(addExercise);

router.route("/api/users/:_id/logs").get(showExercises);

module.exports = router;
