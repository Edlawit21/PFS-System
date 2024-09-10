const express = require("express");
const router = express.Router();
const {
  createUserValidator,
  updateUserValidator,
  validate,
} = require("../Validation/userValidation");
const {
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controller/User/userController");
const authMiddleware = require("../Middelware/authMiddleware");
const { profileUpload } = require("../Config/multer");

// Routes
// Register a new user
router.post(
  "/register",
  authMiddleware(),
  profileUpload.single("profileImage"), // Handle file upload
  createUserValidator, // Validation middleware
  validate,
  registerUser
);

// Get user details by ID
router.get("/:id", authMiddleware("admin"), getUserById);

// Update user details
router.put(
  "/:id",
  profileUpload.single("profileImage"), // Handle file upload
  updateUserValidator, // Validation middleware
  validate,
  authMiddleware("admin"), // Ensure only authorized users can update
  updateUser
);

// Delete user
router.delete("/:id", authMiddleware("admin"), deleteUser);

// Get all users with pagination
router.get("/", authMiddleware("admin"), getAllUsers);

module.exports = router;
