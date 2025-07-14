const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());

// Hardcoded config
const PORT = 4000;
const MONGO_URI = 'mongodb+srv://admin123:admin123@b546.wenww9x.mongodb.net/fitnessApp?retryWrites=true&w=majority&appName=b546';
const JWT_SECRET = 'fitnessApp';
global.JWT_SECRET = JWT_SECRET;


const corsOptions = {
    //to be updated when we connect this to our client
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



// Connect DB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Correct routes
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');

app.use('/users', userRoutes); // will serve /register, /login, /me
app.use('/workouts', workoutRoutes); // will serve /addWorkout, etc.

// Sever Gateway Response
app.listen(PORT, () => {
  console.log(`API is now online on port ${PORT}`);
});

module.exports = { app, mongoose };
