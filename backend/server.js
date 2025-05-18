require("dotenv").config()
const express = require("express")
const routes = require("./routes/workouts")
const mongoose = require("mongoose")

const app = express()

// Middleware

app.use((req, res, next) => {
  return next()
})

app.use(express.json())
app.use("/api/workouts", routes)

// Connect to the database
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        `listening on port ${process.env.PORT} and connected to the database`
      )
    )
  })
  .catch(() => {
    console.log("Could not connect to the dababase")
  })
