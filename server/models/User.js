const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  phone: { type: String },

  role: {
    type: String, 
    enum: ["admin", "user", "maintenance"], 
    default: 'user'
  },

  maintenanceRole: {
    type: String, 
    enum: ["Electrican", "Plumber", "General Tecnhician", "IT Technician", "Groundsman", null],
    default: null
  },

  date: { 
    type: Date, 
    default: Date.now 
  }
  
});

// Create model
const User = mongoose.model("User", userSchema);

module.exports = User;
