// Routes/adminRoutes.js

const express = require("express");
const router = express.Router();
const adminApprovalController = require("../controller/adminApprovalController");
const authMiddleware = require("../Middelware/authMiddleware");

/**
 * Route Definitions:
 *
 * 1. GET /doctors
 *    - Description: Retrieve all doctor registrations for admin review.
 *    - Middleware: authMiddleware('admin') ensures only admins can access.
 *    - Controller: getAllDoctorRegistrations
 *
 * 2. PUT /doctors/:id
 *    - Description: Approve or reject a specific doctor registration.
 *    - Middleware: authMiddleware('admin') ensures only admins can perform this action.
 *    - Controller: updateDoctorRegistrationStatus
 *
 * 3. GET /pharmacy-managers
 *    - Description: Retrieve all pharmacy manager registrations for admin review.
 *    - Middleware: authMiddleware('admin') ensures only admins can access.
 *    - Controller: getAllPharmacyManagerRegistrations
 *
 * 4. PUT /pharmacy-managers/:id
 *    - Description: Approve or reject a specific pharmacy manager registration.
 *    - Middleware: authMiddleware('admin') ensures only admins can perform this action.
 *    - Controller: updatePharmacyManagerRegistrationStatus
 */

// Route to get all doctor registrations
router.get(
  "/doc",
  authMiddleware("admin"), // Ensure the requester is an admin
  adminApprovalController.getAllDoctorRegistrations // Handle the request
);

// Route to update a specific doctor registration's status
router.put(
  "/doc/:id",
  authMiddleware("admin"), // Ensure the requester is an admin
  adminApprovalController.updateDoctorRegistrationStatus // Handle the request
);

// Route to get all pharmacy manager registrations
router.get(
  "/pm",
  authMiddleware("admin"), // Ensure the requester is an admin
  adminApprovalController.getAllPharmacyManagerRegistrations // Handle the request
);

// Route to update a specific pharmacy manager registration's status
router.put(
  "/pm/:id",
  authMiddleware("admin"), // Ensure the requester is an admin
  adminApprovalController.updatePharmacyManagerRegistrationStatus // Handle the request
);

module.exports = router; // Export the router to be used in the main app
