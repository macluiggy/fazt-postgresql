const express = require("express");
//model
const User = require("../models/user.model")

const router = express.Router();
//controllers
const { create } = require("../controllers/user.controller");
// router.route("/api/users").post((req, res) => {
//   // //console.log(req.body)
//   let { username } = req.body;
//   let newUser = new User({ username: username });
//   newUser.save((error, savedUser) => {
//     if (!error) {
//       let responseObject = {};
//       responseObject["username"] = savedUser.username;
//       responseObject["_id"] = savedUser.id;
//       return res.status(200).json(responseObject);
//     }
//   });
// });
router.route("/api/users").post(create);

module.exports = router