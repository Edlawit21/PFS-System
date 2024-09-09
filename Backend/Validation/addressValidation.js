const { check, body, validationResult } = require("express-validator");

// Validator for creating an address registration
const createAddressValidator = [
  check("pharmacyManagerRegistrationId")
    .isMongoId()
    .withMessage("Invalid Pharmacy Manager Registration ID format")
    .notEmpty()
    .withMessage("Pharmacy Manager Registration ID is required"),

  body("state")
    .notEmpty()
    .withMessage("State is required")
    .isString()
    .withMessage("State must be a string"),

  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string"),

  body("contactNumber")
    .notEmpty()
    .withMessage("Contact Number is required")
    .isString()
    .withMessage("Contact Number must be a string"),

  body("branches")
    .optional()
    .isString()
    .withMessage("Branches must be a string"),

  body("operatingDays")
    .optional()
    .isString()
    .withMessage("Operating Days must be a string"),

  body("servicesOffered")
    .optional()
    .isString()
    .withMessage("Services Offered must be a string"),
];

// Validator for updating an address registration
const updateAddressValidator = [
  check("pharmacyManagerRegistrationId")
    .isMongoId()
    .withMessage("Invalid Pharmacy Manager Registration ID format")
    .notEmpty()
    .withMessage("Pharmacy Manager Registration ID is required"),

  body("state").optional().isString().withMessage("State must be a string"),

  body("city").optional().isString().withMessage("City must be a string"),

  body("contactNumber")
    .optional()
    .isString()
    .withMessage("Contact Number must be a string"),

  body("branches")
    .optional()
    .isString()
    .withMessage("Branches must be a string"),

  body("operatingDays")
    .optional()
    .isString()
    .withMessage("Operating Days must be a string"),

  body("servicesOffered")
    .optional()
    .isString()
    .withMessage("Services Offered must be a string"),
];

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createAddressValidator,
  updateAddressValidator,
  validate,
};
