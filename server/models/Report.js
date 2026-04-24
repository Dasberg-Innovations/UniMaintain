const mongoose = require("mongoose");

// Report schema
const reportSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String, 
    required: true 
  },

  campus: { 
    type: String, 
    required: true 
  },
  
  building: { 
    type: String, 
    required: true 
  },

  category: {
    type: String,
    enum: ["General Maintenance", "Electrical", "Plumbing", "Grounds", "IT", "Safety"],
    required: true
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true
  },

  status: {
    type: String,
    enum: ["Submitted", "Assigned", "In Progress", "Resolved", "Closed"],
    default: "Submitted"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  phone: { 
    type: String, 
    required: true 
  },

  workInstructions: { 
    type: String, 
    default: "" 
  },

  assignedTo: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
  }],

  estimatedHours: { 
    type: Number, 
    default: null 
  },

  completionNotes: { 
    type: String, 
    default: "" 
  },

  rootCause: { 
    type: String, 
    default: "" 
  },

  solution: { 
    type: String, 
    default: "" 
  },

  completedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  completionHours: { 
    type: Number, 
    default: null 
  },

  dateCompleted: { 
    type: Date, 
    default: null 
  },

  seenBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: []
  }],
  

  reportedAt: {
    type: Date,
    default: Date.now
  },

  resolvedAt: {
    type: Date,
    default: null
  }
  
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;