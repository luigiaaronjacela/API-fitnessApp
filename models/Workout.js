const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: String,
  duration: String,
  status: { type: String, default: "Pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', WorkoutSchema);