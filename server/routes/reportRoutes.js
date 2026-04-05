const express = require("express");
const router = express.Router();

const { 
    createReport,
    getReports,
    updateReport
} = require("../controllers/reportController");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/", verifyJWT, createReport);
router.get("/", verifyJWT, getReports);
router.put("/:id", verifyJWT, updateReport);


module.exports = router;