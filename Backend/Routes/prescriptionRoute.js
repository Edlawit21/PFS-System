const express = require("express");
const {
  deletePrescriptionById,
  updatePrescriptionById,
  getPrescriptionById,
  getAllPrescriptions,
  createPrescription,
  getAllMobilePrescriptions,
} = require("../controller/prescriptionController");
const authMiddleware = require("../Middelware/authMiddleware");
const {
  createPrescriptionValidation,
  updatePrescriptionValidation,
} = require("../Validation/prescriptionValidator");
const { validationResult } = require("express-validator"); // Import validationResult
//const { signatureUpload } = require("../Config/multer");

const router = express.Router();

// Route to create a prescription (restricted to doctors)
router.post(
  "/createPrescription",
  [authMiddleware("doctor")],
  createPrescription
);

// Route to get all prescriptions (restricted to doctors and pharmacists)
router.get(
  "/allPrescription",
  // authMiddleware("doctor", "pharmacist"),
  getAllPrescriptions
);

// Route to get a single prescription by ID
router.get("/:id", authMiddleware("doctor", "pharmacist"), getPrescriptionById);

// Route to update a prescription by ID (restricted to doctors)
router.put("/:id", updatePrescriptionById);
router.get("/mobileQr/:id", getAllMobilePrescriptions);
// Route to delete a prescription by ID (restricted to doctors)
router.delete("/:id", authMiddleware("doctor"), deletePrescriptionById);

module.exports = router;
