const Workout = require('../models/Workout');

exports.addWorkout = async (req, res) => {
  const { name, duration } = req.body;
  const workout = new Workout({ name, duration, userId: req.user.id });
  await workout.save();

  res.status(201).json(workout);
};
exports.getMyWorkouts = async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id });

  if (workouts.length === 0) {
    return res.status(404).json({
      message: 'No workouts found'
    });
  }

  res.status(200).json({workouts});
};

exports.updateWorkout = async (req, res) => {
  const workout = await Workout.findOne({ _id: req.params.id, userId: req.user.id });
  if (!workout) return res.status(404).json({ message: 'Workout not found' });

  workout.name = req.body.name || workout.name;
  workout.duration = req.body.duration || workout.duration;
  await workout.save();

  res.status(200).json({
  	message: 'Workout updated successfully',
    updateWorkout: workout
  });
};
exports.deleteWorkout = async (req, res) => {
  const workout = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!workout) return res.status(404).json({ message: 'Workout not found' });

  res.status(200).json({
    message: 'Workout deleted successfully'
  });
};

exports.completeWorkoutStatus = async (req, res) => {
  const workout = await Workout.findOne({ _id: req.params.id, userId: req.user.id });
  if (!workout) return res.status(404).json({ message: 'Workout not found' });

  workout.status = 'completed';
  await workout.save();

  res.status(200).json({
    message: 'Workout status updated successfully',
    updatedWorkout: workout
  });
};