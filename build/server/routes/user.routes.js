"use strict";
var express = require("express");
//model
var User = require("../models/user.model");
var Session = require("../models/session.model").Session;
var router = express.Router();
//controllers
var _a = require("../controllers/user.controller"), create = _a.create, getAllUsers = _a.getAllUsers;
var _b = require("../controllers/session.controllers.js"), addExercise = _b.addExercise, showExercises = _b.showExercises;
router.route("/api/users").post(create).get(getAllUsers);
router.route("/api/users/:_id/exercises").post(addExercise);
router.route("/api/users/:_id/logs").get(showExercises);
module.exports = router;
