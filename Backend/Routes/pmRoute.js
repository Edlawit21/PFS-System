const express = require("express");
const router = express.Router();
const {
  createPharmacyManager,
  updatePharmacyManager,
  getPharmacyManagerRegistration,
  getAllPharmacyManagerRegistrations,
  deletePharmacyManagerRegistration,
  getAllUsersWithPharmacyManagerDetails,
} = require("../controller/User/pmController");
const {
  createPharmacyManagerValidator,
  updatePharmacyManagerValidator,
  validate,
} = require("../Validation/pmValidation");
const authMiddleware = require("../Middelware/authMiddleware");
const { documentUpload } = require("../Config/multer");

// Middleware to handle file uploads
const upload = documentUpload;

// Create a new pharmacy manager's registration
router.post(
  "/register",
  //authMiddleware("pharmacyManager"), // Assuming only admins can create pharmacy managers
  upload.fields([
    { name: "compliance", maxCount: 1 },
    { name: "licensePM", maxCount: 1 },
    { name: "businessR", maxCount: 1 },
  ]),
  createPharmacyManagerValidator,
  validate,
  createPharmacyManager
);

// Update an existing pharmacy manager's registration
router.put(
  "/:id",
  authMiddleware("pharmacyManager", "admin"), // Assuming only admins can update pharmacy managers
  upload.fields([
    { name: "compliance", maxCount: 1 },
    { name: "licensePM", maxCount: 1 },
    { name: "businessR", maxCount: 1 },
  ]),
  updatePharmacyManagerValidator,
  validate,
  updatePharmacyManager
);

// Get a pharmacy manager registration by userId
router.get(
  "/:userId",
  authMiddleware("admin", "pharmacyManager"), // Assuming only admins can view details
  getPharmacyManagerRegistration
);

// Get all pharmacy manager registrations
router.get(
  "/",
  authMiddleware("admin"), // Assuming only admins can view all registrations
  getAllPharmacyManagerRegistrations
);

// Delete a pharmacy manager registration by userId
router.delete(
  "/:userId",
  authMiddleware("admin"), // Assuming only admins can delete registrations
  deletePharmacyManagerRegistration
);

// Get all users with pharmacy manager registration details
router.get(
  "/users-with-pharmacy-manager-details/:userId",
  authMiddleware("admin"), // Assuming only admins can view this information
  getAllUsersWithPharmacyManagerDetails
);

module.exports = router;
