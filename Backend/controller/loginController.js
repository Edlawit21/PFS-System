const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../Models/Userform/userModel");
const Admin = require("../Models/Userform/adminModel");
const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");

const findUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  if (user) return { user, role: user.role };

  const admin = await Admin.findOne({ username });
  if (admin) return { user: admin, role: "admin" };

  const pharmacist = await Pharmacist.findOne({ username });
  if (pharmacist) return { user: pharmacist, role: "pharmacist" };

  return null;
  z;
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { username, password } = req.body;
    console.log("Received login request:");
    console.log("Username:", username);
    console.log("Password:", password);

    const result = await findUserByUsername(username);
    if (!result) return res.status(400).json({ msg: "Invalid credentials" });

    const { user } = result;
    const role = user.role; // Use role from user object
    console.log("User retrieved from database:", user);
    console.log("Stored password (hashed):", user.password);

    const isMatch = await user.comparePassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (role === "admin" || role === "doctor" || role === "pharmacyManager") {
      if (user.status !== "Active")
        return res
          .status(403)
          .json({ msg: "Account is not active. Please contact support." });
    }

    const payload = { id: user._id, role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("Generated token:", token);

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

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login };
