const { Router } = require("express");
const router = new Router();
var {
  getUsers,
  createUser,
  getUserById,
  
} = require("../controllers/index.controller");

router.route("/users").get(getUsers).post(createUser);
router.route("/users/:id").get(getUserById);
router.route('/users/:id').delete()

module.exports = router;
