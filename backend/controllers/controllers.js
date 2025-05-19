const Workout = require("../Models/workout")
const mongoose = require("mongoose")

// Add workout
const addWorkout = async (req, res) => {
  const { name, load, reps } = req.body
  let emptyFields = []
  if (!name) {
    emptyFields.push("name")
  }

  if (!load) {
    emptyFields.push("load")
  }
  if (!reps) {
    emptyFields.push("reps")
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields })
  }
  try {
    const user_id = req.user._id
    console.log(user_id)
    const workout = await Workout.create({ name, load, reps, user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// Get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  Workout.find({ user_id })
    .sort({ createdAt: -1 })
    .then((results) => {
      res.status(200).json(results)
    })
    .catch((err) => {
      res.status(404).json({ error: err.message })
    })
}

// Get one workout
const getWorkout = async (req, res) => {
  const { id } = req.params
  if (mongoose.Types.ObjectId.isValid(id)) {
    Workout.findById(id)
      .then((result) => {
        res.status(200).json(result)
      })
      .then((error) => {
        res.status(500).json({ error: error.message })
      })
  } else {
    res.status(402).json({ error: "Not a valid Document ID" })
  }
}
// Update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params
  if (mongoose.Types.ObjectId.isValid(id)) {
    Workout.findByIdAndUpdate(id, req.body)
      .then((result) => {
        Workout.findOne({ _id: id }).then((workout) => {
          res.status(200).json(workout)
        })
      })
      .catch((error) => {
        res.status(500).json({ error: error.message })
      })
  } else {
    res.status(402).json({ error: "Not a valid Document ID" })
  }
}
// Update workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params
  if (mongoose.Types.ObjectId.isValid(id)) {
    Workout.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((error) => {
        res.status(500).json({ error: error.message })
      })
  } else {
    res.status(402).json({ error: "Not a valid Document ID" })
  }
}

module.exports = {
  addWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
}
