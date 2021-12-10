var mongoose = require("mongoose");
var { exerciseSessionSchema } = require("./session.model");

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  log: [exerciseSessionSchema],
});
var User = mongoose.model("User", userSchema);

module.exports = { User };
// hello