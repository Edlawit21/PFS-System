const express = require("express");
const router = express.Router();
const {
  getUserAndRoleDetails,
  toggleUserActivation,
} = require("../controller/statusController");

// Route to fetch user and role-specific details for activation/deactivation
router.get("/:userId/details", getUserAndRoleDetails);

// Route to toggle activation status for both doctor and pharmacy manager
router.put("/:userId/toggle", toggleUserActivation);

module.exports = router;
