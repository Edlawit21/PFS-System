const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const authRoutes = require("./Routes/auth"); // Ensure authRoutes is imported
const initializeDefaultAdmin = require("./Initialization/initializeDefaultAdmin"); // Path to your initialization script

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Initialize default admin
initializeDefaultAdmin()
  .then(() => {
    console.log("Default admin user initialized");
  })
  .catch((error) => {
    console.error("Error initializing default admin user:", error);
  });

// Basic Route to Check Server Status
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
