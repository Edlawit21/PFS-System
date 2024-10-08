const User = require("../../Models/Userform/userModel");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      gender,
      phoneNumber,
      role,
      password,
    } = req.body;

    // // Ensure that profileImage is included in the request
    // if (!req.file) {
    //   return res.status(400).json({ message: "Profile image is required." });
    // }
    //const profileImage = req.file.path; // File path or URL

    // Check if the email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists." });
    }

    // Create a new user with the hashed password
    const newUser = new User({
      firstname,
      lastname,
      // profileImage,
      username,
      email,
      gender,
      phoneNumber,
      role,
      password,
      status: "Pending",
    });

    // Save the user
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get user details by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, username, email, gender, phoneNumber, role } =
      req.body;

    const updateFields = {
      firstname,
      lastname,
      username,
      email,
      gender,
      phoneNumber,
      role,
    };

    if (req.file) {
      updateFields.profileImage = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database (no pagination)
    const users = await User.find();

    const totalUsers = await User.countDocuments(); // Count total users

    res.status(200).json({
      users,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Export all functions together
module.exports = {
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
