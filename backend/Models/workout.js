const mongoose = require("mongoose")
const Schema = mongoose.Schema

// workout Schema
const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Workout = mongoose.model("workout", workoutSchema)

module.exports = Workout
