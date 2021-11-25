const mongoose = require("mongoose");
const { exerciseSessionSchema } = require("./session.model");

let userSchema = mongoose.Schema({
  username: { type: String, required: true },
  log: [exerciseSessionSchema],
});
let User = mongoose.model("User", userSchema);

module.exports = { User };
