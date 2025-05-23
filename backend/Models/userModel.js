const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation

  if (!email || !password) {
    throw Error("All fields are required!")
  }

  // email validation
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email format!")
  }
  // Check is email exists
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error("Email already in use")
  }

  // password validation
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })
  return user
}

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required!")
  }
  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Incorrect Email")
  }

  const match = await bcrypt.compare(password, user.password)
  if (match) {
    return user
  } else {
    throw Error("Incorrect password")
  }
}

module.exports = mongoose.model("user", userSchema)
