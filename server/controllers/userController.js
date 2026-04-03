const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register Controller
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all users (Admin only)
const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// UPDATE users (Admin only)
const updateUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const usersToUpdate = req.body;

    const updatePromises = usersToUpdate.map((user) =>
      User.findByIdAndUpdate(
        user._id,
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          maintenanceRole:
            user.role === "maintenance" ? user.maintenanceRole : null,
        },
        { returnDocument: "after" }
      )
    );

    const updatedUsers = await Promise.all(updatePromises);
    res.json({ message: "Users updated successfully", updatedUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating users" });
  }
};

// DELETE user (Admin only)
const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUsers,
  deleteUser,
};
