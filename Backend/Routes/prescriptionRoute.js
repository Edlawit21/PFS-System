const express = require("express");
const {
  deletePrescriptionById,
  updatePrescriptionById,
  getPrescriptionById,
  getAllPrescriptions,
  createPrescription,
} = require("../controller/prescriptionController");
const authMiddleware = require("../Middelware/authMiddleware");
const {
  createPrescriptionValidation,
  updatePrescriptionValidation,
} = require("../Validation/prescriptionValidator");
const { validationResult } = require("express-validator"); // Import validationResult

const router = express.Router();

// Route to create a prescription (restricted to doctors)
router.post(
  "/createPrescription",
  [authMiddleware("doctor"), createPrescriptionValidation],
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createPrescription
);

// Route to get all prescriptions (restricted to doctors and pharmacists)
router.get(
  "/allPrescription",
  authMiddleware("doctor", "pharmacist"),
  getAllPrescriptions
);

// Route to get a single prescription by ID
router.get(
  "/prescription/:id",
  authMiddleware("doctor", "pharmacist"),
  getPrescriptionById
);

// Route to update a prescription by ID (restricted to doctors)
router.put(
  "/prescription/:id",
  [authMiddleware("doctor"), updatePrescriptionValidation],
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updatePrescriptionById
);

// Route to delete a prescription by ID (restricted to doctors)
router.delete(
  "/prescription/:id",
  authMiddleware("doctor"),
  deletePrescriptionById
);

module.exports = router;
