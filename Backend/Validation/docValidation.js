const { check, body, validationResult } = require("express-validator");

// Validator for creating a doctor
const createDoctorValidator = [
  check("userId")
    .isMongoId()
    .withMessage("Invalid User ID format")
    .notEmpty()
    .withMessage("User ID is required"),

  body("docName")
    .notEmpty()
    .withMessage("Doctor name is required")
    .isString()
    .withMessage("Doctor name must be a string"),

  body("hospitalName")
    .notEmpty()
    .withMessage("Hospital name is required")
    .isString()
    .withMessage("Hospital name must be a string"),

  body("hospitalType")
    .notEmpty()
    .withMessage("Hospital type is required")
    .isString()
    .withMessage("Hospital type must be a string"),

  body("specialization")
    .notEmpty()
    .withMessage("Specialization is required")
    .isString()
    .withMessage("Specialization must be a string"),

  body("experience")
    .notEmpty()
    .withMessage("Experience is required")
    .isNumeric()
    .withMessage("Experience must be a number"),

  body("pin")
    .notEmpty()
    .withMessage("PIN is required")
    .isString()
    .withMessage("PIN must be a string"),
];

// Validator for updating a doctor
const updateDoctorValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Doctor ID format")
    .notEmpty()
    .withMessage("User ID is required"),

  body("docName")
    .optional()
    .isString()
    .withMessage("Doctor name must be a string"),

  body("hospitalName")
    .optional()
    .isString()
    .withMessage("Hospital name must be a string"),

  body("hospitalType")
    .optional()
    .isString()
    .withMessage("Hospital type must be a string"),

  body("specialization")
    .optional()
    .isString()
    .withMessage("Specialization must be a string"),

  body("experience")
    .optional()
    .isNumeric()
    .withMessage("Experience must be a number"),

  body("pin").optional().isString().withMessage("PIN must be a string"),
];

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  createDoctorValidator,
  updateDoctorValidator,
  validate,
};
