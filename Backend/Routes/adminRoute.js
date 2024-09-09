const express = require("express");
const Admin = require("../Models/Userform/adminModel");
const router = express.Router();

{
  /*// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate a token and send it in the response
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET, // Use environment variable for JWT secret
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});*/
}

// Route to get admin details by ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optionally, remove sensitive information (e.g., password) from the response
    const { password, ...adminWithoutPassword } = admin.toObject();
    res.json(adminWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to create a new admin
router.post("/create", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the username or email already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { password }],
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Create a new admin instance
    const newAdmin = new Admin({
      username,
      password,
      role,
    });

    // Save the new admin to the database
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
