const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../Models/Userform/adminModel");

const initializeDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Default admin already exists.");
      return;
    }

    // Hash the admin password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("@admin123", salt); // Use a secure password

    // Create a default admin
    const defaultAdmin = new Admin({
      username: "admin",
      password: hashedPassword,
      role: "admin",
      status: "Active",
    });

    // Save the admin
    await defaultAdmin.save();
    console.log("Default admin created successfully.");
  } catch (error) {
    console.error("Error initializing default admin:", error);
  }
};

module.exports = initializeDefaultAdmin;
