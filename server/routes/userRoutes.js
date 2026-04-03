const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const {
  registerUser,
  loginUser,
  getUsers,
  updateUsers,
  deleteUser,
} = require("../controllers/userController");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin-only routes
router.get("/", verifyJWT, getUsers);
router.put("/", verifyJWT, updateUsers);
router.delete("/:id", verifyJWT, deleteUser);

module.exports = router;
