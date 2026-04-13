const Report = require("../models/Report");

// CREATE report
const createReport = async (req, res) => {
  try {
    const { title, description, campus, building, category, priority, phone } = req.body;

    // create report
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

// GET report
const getReports = async (req, res) => {
  try {
    let reports;

    if (req.user.role === "admin"){
      // Allows admin to see all reports
      reports = await Report.find()
      .populate("createdBy", "name email")
      .populate("assignedTo", "name")
      .populate("completedBy", "name");
    } else if (req.user.role === "maintenance") {
      // Allows maintenance to see only assigned reports
      reports = await Report.find({
        assignedTo: req.user.id
      })
        .populate("createdBy", "name email")
        .populate("assignedTo", "name")
        .populate("completedBy", "name");
    } else {
      // Allows regular users to see their submitted reports
      reports = await Report.find({createdBy: req.user.id}).populate("createdBy", "name email");
    }
    
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};

// update report
const updateReport = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      {
        // general tab
        description: req.body.description,
        workInstructions: req.body.workInstructions,
        assignment: req.body.assignment,
        estimatedHours: req.body.estimatedHours,

        // completion tab
        completionNotes: req.body.completionNotes,
        rootCause: req.body.rootCause,
        solution: req.body.solution,
        completedBy: req.body.completedBy,
        completionHours: req.body.completionHours,
        dateCompleted: req.body.dateCompleted,

        // status + assignment updates
        status: req.body.status,
        assignedTo: req.body.assignedTo
      },
      { returnDocument: "after" }
    ).populate("createdBy assignedTo completedBy");

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(updatedReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating report" });
  }
};

// DELETE report (Admin only)
const deleteReport = async (req, res) => {
  try {
    // only admins can delete reports
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;

    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting report" });
  }
};

module.exports = { 
  createReport , 
  getReports, 
  updateReport,
  deleteReport
};