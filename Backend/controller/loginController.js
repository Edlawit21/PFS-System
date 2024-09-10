const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../Models/Userform/userModel");
const Admin = require("..//Models/Userform/adminModel");
const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");

// Function to find the user by username and determine their role
const findUserByUsername = async (username) => {
  // Check in the common user model (for Doctor and PM)
  const user = await User.findOne({ username });
  if (user) {
    return { user, role: user.role };
  }

  // Check in the Admin model
  const admin = await Admin.findOne({ username });
  if (admin) {
    return { user: admin, role: "admin" };
  }

  // Check in the Pharmacist model
  const pharmacist = await Pharmacist.findOne({ username });
  if (pharmacist) {
    return { user: pharmacist, role: "pharmacist" };
  }

  return null;
};

// Login function
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    // Find user by username
    const result = await findUserByUsername(username);

    if (!result) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const { user, role } = result;

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // For Admin and Doctor/PM, check if the user status is active
    if (role === "admin" || role === "doctor" || role === "pharmacyManager") {
      if (user.status !== "Active") {
        return res
          .status(403)
          .json({ msg: "Account is not active. Please contact support." });
      }
    }

    // Generate JWT token
    const payload = { id: user._id, role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set HTTP-only cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("role", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ user, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { login };
