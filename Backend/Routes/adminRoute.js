const express = require("express");
const Admin = require("../Models/Userform/adminModel");
const router = express.Router();

// Route to get admin details by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Trim any whitespace characters, including newlines
  const trimmedId = id.trim();

  try {
    const admin = await Admin.findById(trimmedId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Remove sensitive information (e.g., password) from the response
    const { password, ...adminWithoutPassword } = admin.toObject();
    res.json(adminWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get all admins
router.get("/", async (req, res) => {
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
    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new admin instance
    const newAdmin = new Admin({ username, password, role });

    // Save the new admin to the database
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to update an admin by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  // Trim any whitespace characters, including newlines
  const trimmedId = id.trim();

  try {
    // Find and update the admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      trimmedId,
      { username, password, role },
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators` validates the update
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Remove sensitive information (e.g., password) from the response
    const { password: pass, ...adminWithoutPassword } = updatedAdmin.toObject();
    res.json(adminWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to delete an admin by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Trim any whitespace characters, including newlines
  const trimmedId = id.trim();

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(trimmedId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
