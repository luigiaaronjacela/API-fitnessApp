const express = require('express');
const router = express.Router();
const { verify } = require('../auth');
const {
  addWorkout,
  getMyWorkouts,
  updateWorkout,
  deleteWorkout,
  completeWorkoutStatus
} = require('../controllers/workout');

router.post('/addWorkout', verify, addWorkout);
router.get('/getMyWorkouts', verify, getMyWorkouts);
router.patch('/updateWorkout/:id', verify, updateWorkout);
router.delete('/deleteWorkout/:id', verify, deleteWorkout);
router.patch('/completeWorkoutStatus/:id', verify, completeWorkoutStatus);

module.exports = router;