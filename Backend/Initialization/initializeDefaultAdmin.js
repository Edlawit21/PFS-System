const mongoose = require("mongoose");
const Admin = require("../Models/Userform/adminModel");

const initializeDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("Default admin already exists.");
      return;
    }

    // Create a default admin
    const defaultAdmin = new Admin({
      username: "admin",
      password: "admin123", // Use plain password, hashing is handled by the schema
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
