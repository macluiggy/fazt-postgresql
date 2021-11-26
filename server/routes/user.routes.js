const express = require("express");
//model
const User = require("../models/user.model");
const { Session } = require("../models/session.model");
const router = express.Router();
//controllers
const { create, getAllUsers } = require("../controllers/user.controller.ts");
const {
  addExercise,
  showExercises,
} = require("../controllers/session.controllers.js");

router.route("/api/users").post(create).get(getAllUsers);

router.route("/api/users/:_id/exercises").post(addExercise);

router.route("/api/users/:_id/logs").get(showExercises);

module.exports = router;
