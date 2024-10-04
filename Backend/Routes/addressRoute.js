const express = require("express");
const router = express.Router();

const {
  createAddress,
  updateAddress,
  getAddressRegistration,
  getAllAddressRegistrations,
  deleteAddressRegistration,
  getAllUsersWithPharmacyManagerAndAddressDetails,
} = require("../controller/User/addressController");

const {
  createAddressValidator,
  updateAddressValidator,
  validate,
} = require("../Validation/addressValidation");
const authMiddleware = require("../Middelware/authMiddleware");
const checkAddressOwnership = require("../Middelware/addressMiddleware");

// Create Address Registration
router.post(
  "/",
  authMiddleware("pharmacyManager"), // Ensure only pharmacy managers can access this route
  createAddressValidator,
  validate,
  createAddress
);

// Update Address Registration
router.put(
  "/:addressId",
  authMiddleware("pharmacyManager"), // Ensure only pharmacy managers can access this route
  updateAddressValidator,
  checkAddressOwnership,
  validate,
  updateAddress
);

// Get Address Registration by ID
router.get(
  "/:pharmacyManagerRegistrationId",
  authMiddleware("pharmacyManager"), // Ensure only pharmacy managers can access this route
  getAddressRegistration,
  checkAddressOwnership
);

// Get All Address Registrations
router.get(
  "/addresses",
  authMiddleware("pharmacyManager"), // Ensure only pharmacy managers can access this route
  getAllAddressRegistrations,
  checkAddressOwnership
);

// Delete Address Registration
router.delete(
  "/:pharmacyManagerRegistrationId",
  authMiddleware("pharmacyManager"), // Ensure only pharmacy managers can access this route
  deleteAddressRegistration,
  checkAddressOwnership
);

// Get All Users with Pharmacy Manager and Address Details
router.get(
  "/users-with-details",
  authMiddleware("admin"), // Assuming only admins can access this route
  getAllUsersWithPharmacyManagerAndAddressDetails
);

module.exports = router;
