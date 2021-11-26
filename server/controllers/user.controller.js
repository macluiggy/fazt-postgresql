var { User } = require("../models/user.model");

const create = async (req, res) => {
  // //console.log(req.body)
  let { body } = req;
  if (!body.username) {
    console.log(body);
    return res.status(400).json({ message: "Username must be provided"})
  }
  let newUser = new User(body);
  try {
    await newUser.save((error, savedUser) => {
      if (!error) {
        let responseObject = {};
        responseObject["username"] = savedUser.username;
        responseObject["_id"] = savedUser.id;
        return res.status(200).json(responseObject);
      }
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    })
  }
};

const getAllUsers = (req, res) => {
  User.find({}, (error, arrayOfUsers) => {
    res.json(arrayOfUsers);
  });
};

module.exports = {
  create,
  getAllUsers,
};
