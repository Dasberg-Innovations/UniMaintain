const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, default: 'user'},
  date: { type: Date, default: Date.now }
});

// Create model
const User = mongoose.model("User", userSchema);

module.exports = User;
