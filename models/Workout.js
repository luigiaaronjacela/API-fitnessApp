const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateAdded: { type: Date, default: Date.now } // ✅ REQUIRED
});

module.exports = mongoose.model('Workout', WorkoutSchema);