const express = require("express");
const router = express.Router();
const {
  getApprovedAndActiveUsers,
  getUserAndRoleDetails,
  toggleUserActivation,
  getUsersByStatus,
  getAllUsers,
} = require("../controller/statusController");
const authMiddleware = require("../Middelware/authMiddleware");

// Route to fetch all users with their statuses
router.get("/users/all", authMiddleware("admin"), getAllUsers);

// Route to fetch users by their status (active or inactive)
router.get("/users/status/:status", authMiddleware("admin"), getUsersByStatus);
// Route to fetch user and role-specific details
router.get(
  "/users/:userId/details",
  authMiddleware("admin"),
  getUserAndRoleDetails
);

// Route to toggle user activation status
router.patch(
  "/users/:userId/activation",
  authMiddleware("admin"),
  toggleUserActivation
);

module.exports = router;
