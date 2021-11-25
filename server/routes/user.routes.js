const express = require("express");

const router = express.Router();

router.route("/api/users").post((req, res) => {
  // //console.log(req.body)
  let { username } = req.body;
  let newUser = new User({ username: username });
  newUser.save((error, savedUser) => {
    if (!error) {
      let responseObject = {};
      responseObject["username"] = savedUser.username;
      responseObject["_id"] = savedUser.id;
      res.json(responseObject);
    }
  });
});

module.exports = router