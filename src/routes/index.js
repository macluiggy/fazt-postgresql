const { Router } = require("express");
const router = new Router();
var { getUsers, createUser } = require("../controllers/index.controller");
router.route("/users").get(getUsers).post(createUser);

module.exports = router;
