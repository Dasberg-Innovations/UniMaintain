const express = require("express");
const router = express.Router();

const { 
    createReport,
    getReports,
    updateReport,
    markAsSeen,
    deleteReport
} = require("../controllers/reportController");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/", verifyJWT, createReport);
router.get("/", verifyJWT, getReports);
router.put("/:id", verifyJWT, updateReport);
router.put("/:id/seen", verifyJWT, markAsSeen);
router.delete("/:id", verifyJWT, deleteReport);


module.exports = router;