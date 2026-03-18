const Report = require("../models/Report");

// Create Report Controller
const createReport = async (req, res) => {
  try {
    const { title, description, campus, building, category, priority, phone } = req.body;

    // Create report
    const newReport = new Report({
      title,
      description,
      campus,
      building,
      category,
      priority,
      phone,
      createdBy: req.user.id
    });

    await newReport.save();

    res.status(201).json({
      message: "Report submitted successfully",
      report: newReport
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getReports = async (req, res) => {
  try {
    let reports;

    if (req.user.role === "admin"){
      // Allows admin to see all reports
      reports = await Report.find().populate("createdBy", "name email");
    } else {
      // Allows regular users to see their submitted reports
      reports = await Report.find({createdBy: req.user.id}).populate("createdBy", "name email");
    }
    
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};

module.exports = { createReport , getReports};