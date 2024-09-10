const express = require("express");
const prescriptionController = require("../controller/prescriptionController");
const authMiddleware = require("../Middelware/authMiddleware");
const {
  createPrescriptionValidation,
  updatePrescriptionValidation,
} = require("../Validators/prescriptionValidation");

const router = express.Router();

// Route to create a prescription (restricted to doctors)
router.post(
  "/",
  [authMiddleware("doctor"), createPrescriptionValidation],
  prescriptionController.createPrescription
);

// Route to get all prescriptions (restricted to doctors and pharmacists)
router.get(
  "/",
  authMiddleware("doctor"),
  prescriptionController.getAllPrescriptions
);

// Route to get a single prescription by ID
router.get(
  "/:id",
  authMiddleware("doctor", "pharmacist"),
  prescriptionController.getPrescriptionById
);

// Route to update a prescription by ID (restricted to doctors)
router.put(
  "/:id",
  [authMiddleware("doctor"), updatePrescriptionValidation],
  prescriptionController.updatePrescriptionById
);

// Route to delete a prescription by ID (restricted to doctors)
router.delete(
  "/:id",
  authMiddleware("doctor"),
  prescriptionController.deletePrescriptionById
);

module.exports = router;
