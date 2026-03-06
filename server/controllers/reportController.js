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
      createdBy: req.user.email
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

module.exports = { createReport };