const { check } = require("express-validator");

exports.createPrescriptionValidation = [
  check("patientName", "Patient name is required").not().isEmpty(),
  check("medication", "Medication details are required").not().isEmpty(),
  check("dosage", "Dosage is required").not().isEmpty(),
  check("date", "Date is required").isISO8601(), // ISO8601 ensures date format validity
];

exports.updatePrescriptionValidation = [
  check("patientName", "Patient name is required").optional().not().isEmpty(),
  check("medication", "Medication details are required")
    .optional()
    .not()
    .isEmpty(),
  check("dosage", "Dosage is required").optional().not().isEmpty(),
  check("date", "Valid date is required").optional().isISO8601(),
];
