const User = require("../../Models/Userform/userModel");
const bcrypt = require("bcryptjs");

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

    // Ensure that profileImage is included in the request
    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required." });
    }
    const profileImage = req.file.path; // File path or URL

    // Check if the email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists." });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      firstname,
      lastname,
      profileImage,
      username,
      email,
      gender,
      phoneNumber,
      role,
      password: hashedPassword, // Save hashed password
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

module.exports = { registerUser };

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
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, username, email, gender, phoneNumber, role } =
      req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        profileImage: req.file ? req.file.path : undefined, // Update profileImage if a new file is uploaded
        username,
        email,
        gender,
        phoneNumber,
        role,
      },
      { new: true }
    );

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
module.exports = { getUserById };

{
  /*// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      username,
      email,
      gender,
      phoneNumber,
      role,
    } = req.body;

    // Ensure profile image is updated if it exists
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

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
 */
}

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

module.exports = { deleteUser };

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 users per page

    const users = await User.find()
      .limit(limit * 1) // Limit the number of users returned
      .skip((page - 1) * limit); // Skip users based on current page

    const totalUsers = await User.countDocuments(); // Count total users

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAllUsers };
