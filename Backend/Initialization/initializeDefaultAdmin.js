const mongoose = require("mongoose");
const Admin = require("../Models/User/adminModel"); // Adjust the path as needed

const initializeDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Default admin already exists.");
      return;
    }

    // Create a default admin
    const defaultAdmin = new Admin({
      username: "admin",
      password: "@admin123", // Ensure you hash this password
      role: "admin",
      // other fields if needed
    });

    // Save the admin
    await defaultAdmin.save();
    console.log("Default admin created successfully.");
  } catch (error) {
    console.error("Error initializing default admin:", error);
  }
};

module.exports = initializeDefaultAdmin;
