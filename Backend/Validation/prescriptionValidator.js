const { check } = require("express-validator");

const createPrescriptionValidation = [
  check("datePicker", "Date is required").isISO8601(), // ISO8601 ensures date format validity
  check("patient.firstName", "Patient first name is required").not().isEmpty(),
  check("patient.lastName", "Patient last name is required").not().isEmpty(),
  check("patient.age", "Patient age is required").isInt({ min: 0 }),
  check("patient.gender", "Patient gender is required").isIn([
    "Male",
    "Female",
  ]),
  check("patient.phonenumber", "Patient phone number is required")
    .not()
    .isEmpty(),
  check("medications", "Medications details are required").isArray().notEmpty(),
  check("physician.firstName", "Physician first name is required")
    .not()
    .isEmpty(),
  check("physician.lastName", "Physician last name is required")
    .not()
    .isEmpty(),
  check("physician.phonenumber", "Physician phone number is required")
    .not()
    .isEmpty(),
  check("signature", "Signature is required").not().isEmpty(),
];

const updatePrescriptionValidation = [
  check("datePicker", "Date is required").optional().isISO8601(),
  check("patient.firstName", "Patient first name is required")
    .optional()
    .not()
    .isEmpty(),
  check("patient.lastName", "Patient last name is required")
    .optional()
    .not()
    .isEmpty(),
  check("patient.age", "Patient age is required").optional().isInt({ min: 0 }),
  check("patient.gender", "Patient gender is required")
    .optional()
    .isIn(["Male", "Female"]),
  check("patient.phonenumber", "Patient phone number is required")
    .optional()
    .not()
    .isEmpty(),
  check("medications", "Medications details are required")
    .optional()
    .isArray()
    .notEmpty(),
  check("physician.firstName", "Physician first name is required")
    .optional()
    .not()
    .isEmpty(),
  check("physician.lastName", "Physician last name is required")
    .optional()
    .not()
    .isEmpty(),
  check("physician.phonenumber", "Physician phone number is required")
    .optional()
    .not()
    .isEmpty(),
  check("signature", "Signature is required").optional().not().isEmpty(),
];

module.exports = {
  createPrescriptionValidation,
  updatePrescriptionValidation,
};
