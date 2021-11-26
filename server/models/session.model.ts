var mongoose = require('mongoose');
var exerciseSessionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String
})
var Session = mongoose.model('Session', exerciseSessionSchema);

module.exports = {
  Session,
  exerciseSessionSchema,
}