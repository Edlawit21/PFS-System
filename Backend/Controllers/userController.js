const User = require("../models/User");
const DoctorRegistration = require("../models/DoctorRegistration");
const PharmacyManagerRegistration = require("../models/PharmacyManagerRegistration");

exports.registerUser = async (req, res) => {
  try {
    // Step 1: Validate and extract input data
    const {
      firstname,
      lastname,
      profileImage,
      username,
      email,
      gender,
      phoneNumber,
      role,
      password,
      ...roleSpecificData
    } = req.body;
    if (!firstname || !lastname || !email || !role || !password) {
      return res.status(400).json({ error: "Required fields are missing." });
    }
    // Step 2: Save basic user information
    const newUser = new User({
      firstname,
      lastname,
      profileImage,
      username,
      email,
      gender,
      phoneNumber,
      role,
      password, // Password will be hashed automatically by the pre-save hook
    });

    await newUser.save();

    // Step 3: Save role-specific information
    let roleSpecificRegistration;
    if (role === "doctor") {
      roleSpecificRegistration = new DoctorRegistration({
        userId: newUser._id,
        ...roleSpecificData, // Spread the rest of the data
        status: "Pending", // Initial status
      });
    } else if (role === "pharmacyManager") {
      roleSpecificRegistration = new PharmacyManagerRegistration({
        userId: newUser._id,
        ...roleSpecificData,
        status: "Pending",
      });
    }

    await roleSpecificRegistration.save();

    // Step 4: Send a response to the client
    res
      .status(201)
      .json({ message: "Registration successful. Awaiting admin approval." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user." });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "User update failed." });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "User deletion failed." });
  }
};
