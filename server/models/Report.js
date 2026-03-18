const mongoose = require("mongoose");

// Report schema
const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  campus: { type: String, required: true },
  building: { type: String, required: true },
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
  phone: { type: String, required: true },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
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