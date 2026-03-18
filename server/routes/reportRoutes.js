const express = require("express");
const router = express.Router();

const { 
    createReport,
    getReports 
} = require("../controllers/reportController");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/", verifyJWT, createReport);
router.get("/", verifyJWT, getReports);

module.exports = router;