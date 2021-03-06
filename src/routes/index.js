const { Router } = require("express");
const router = new Router();
var { getUsers, createUser, getUserById, deleteUser, updateUser } =
  require("../controllers/index.controller").fn;

router.route("/users").get(getUsers).post(createUser);
router.route("/users/:id").get(getUserById).delete(deleteUser).put(updateUser);
// router.route("/usuario/:id").get(deleteUser); // tambien borraria, get delete o los demas se usan mas para describir lo que se va a hacer

module.exports = router;
