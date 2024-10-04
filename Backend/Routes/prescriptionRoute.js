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
//const { signatureUpload } = require("../Config/multer");

const router = express.Router();

// Route to create a prescription (restricted to doctors)
router.post(
  "/createPrescription",
  //signatureUpload.single("signature"),
  [authMiddleware("doctor")],
  createPrescription
);

// Route to get all prescriptions (restricted to doctors and pharmacists)
router.get(
  "/allPrescription",
  authMiddleware("doctor", "pharmacist"),
  getAllPrescriptions
);

// Route to get a single prescription by ID
router.get("/:id", authMiddleware("doctor", "pharmacist"), getPrescriptionById);

// Route to update a prescription by ID (restricted to doctors)
router.put(
  "/:id",
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
router.delete("/:id", authMiddleware("doctor"), deletePrescriptionById);

module.exports = router;
