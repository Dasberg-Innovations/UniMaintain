const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: "Unauthorized" });

      res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
