const User = require('../models/user.model')

const create = (req, res) => {
    // //console.log(req.body)
    let { username } = req.body;
    let newUser = new User({ username: username });
    newUser.save((error, savedUser) => {
      if (!error) {
        let responseObject = {};
        responseObject["username"] = savedUser.username;
        responseObject["_id"] = savedUser.id;
        return res.status(200).json(responseObject);
      }
    });
  };

module.exports = {
  create
};