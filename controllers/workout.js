const Workout = require('../models/Workout');

// Add workout
exports.addWorkout = async (req, res) => {
  try {
    const { name, duration, status = "Pending" } = req.body;

    const workout = new Workout({
      name,
      duration,
      status,
      userId: req.user.id,
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    console.error("❌ Add Workout Error:", err);
    res.status(500).json({ message: "Failed to add workout" });
  }
};

// Get my workouts
exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    if (workouts.length === 0) {
      return res.status(404).json({ message: "No workouts found" });
    }
    res.status(200).json({ workouts });
  } catch (err) {
    console.error("❌ Get Workouts Error:", err);
    res.status(500).json({ message: "Failed to get workouts" });
  }
};

// Update workout
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    workout.name = req.body.name || workout.name;
    workout.duration = req.body.duration || workout.duration;
    workout.status = req.body.status || workout.status;

    await workout.save();

    res.status(200).json({
      message: "Workout updated successfully",
      updatedWorkout: workout,
    });
  } catch (err) {
    console.error("❌ Update Workout Error:", err);
    res.status(500).json({ message: "Failed to update workout" });
  }
};

// Delete workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Workout Error:", err);
    res.status(500).json({ message: "Failed to delete workout" });
  }
};

// Mark workout as completed
exports.completeWorkoutStatus = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    workout.status = "Completed";
    await workout.save();

    res.status(200).json({
      message: "Workout status updated successfully",
      updatedWorkout: workout,
    });
  } catch (err) {
    console.error("❌ Complete Workout Error:", err);
    res.status(500).json({ message: "Failed to complete workout" });
  }
};