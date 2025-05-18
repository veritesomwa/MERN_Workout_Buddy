const express = require("express")
const {
  addWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/controllers")
const router = express.Router()

// getting all workouts
router.get("/", getWorkouts)

// getting one workout
router.get("/:id", getWorkout)

// adding a workout
router.post("/", addWorkout)

// updating a current workout
router.patch("/:id", updateWorkout)

// deleting a workout
router.delete("/:id", deleteWorkout)

module.exports = router
