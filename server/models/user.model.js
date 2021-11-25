const mongoose = require("mongoose");
const { exerciseSessionSchema } = require("./session.model");

let userSchema = mongoose.Schema({
  username: { type: String, required: true },
  log: [exerciseSessionSchema],
});

module.exports = mongoose.model("User", userSchema);
