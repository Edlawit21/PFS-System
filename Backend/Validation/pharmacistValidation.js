const { check, body, validationResult } = require("express-validator");

// Validator for creating a pharmacist
const createPharmacistValidator = [
  body("firstname")
    .notEmpty()
    .withMessage("First name is required.")
    .isString()
    .withMessage("First name must be a string."),

  body("lastname")
    .notEmpty()
    .withMessage("Last name is required.")
    .isString()
    .withMessage("Last name must be a string."),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required.")
    .isString()
    .withMessage("Gender must be a string."),

  body("contact").notEmpty().withMessage("Phone number is required."),
  // .isMobilePhone()
  // .withMessage("Invalid phone number format."),
  // body("contact.email")
  //   .notEmpty()
  //   .withMessage("Email is required.")
  //   .isEmail()
  //   .withMessage("Invalid email format."),
  body("residentialAddress")
    .notEmpty()
    .withMessage("Residential address is required.")
    .isString()
    .withMessage("Residential address must be a string."),

  // body("graduationDate")
  //   .notEmpty()
  //   .withMessage("Graduation date is required.")
  //   .matches(/^\d{4}-\d{2}-\d{2}$/)
  //   .withMessage("Invalid graduation date format. Use YYYY-MM-DD."),

  body("licenseNumber")
    .notEmpty()
    .withMessage("License number is required.")
    .isString()
    .withMessage("License number must be a string."),

  // body("licenseExpiryDate")
  //   .notEmpty()
  //   .withMessage("License expiry date is required.")
  //   .matches(/^\d{4}-\d{2}-\d{2}$/)
  //   .withMessage("Invalid license expiry date format. Use YYYY-MM-DD."),

  body("experience")
    .notEmpty()
    .withMessage("Experience is required.")
    .isString()
    .withMessage("Experience must be a string."),
];

// Validator for updating a pharmacist
const updatePharmacistValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Pharmacist ID format.")
    .notEmpty()
    .withMessage("Pharmacist ID is required."),

  body("firstname")
    .optional()
    .isString()
    .withMessage("First name must be a string."),

  body("lastname")
    .optional()
    .isString()
    .withMessage("Last name must be a string."),

  body("gender").optional().isString().withMessage("Gender must be a string."),

  // body("contact")
  //   .optional()
  //   .isMobilePhone()
  //   .withMessage("Invalid contact number format."),

  body("residentialAddress")
    .optional()
    .isString()
    .withMessage("Residential address must be a string."),

  // body("graduationDate")
  //   .optional()
  //   .matches(/^\d{4}-\d{2}-\d{2}$/)
  //   .withMessage("Invalid graduation date format. Use YYYY-MM-DD."),

  body("licenseNumber")
    .optional()
    .isString()
    .withMessage("License number must be a string."),

  // body("licenseExpiryDate")
  //   .optional()
  //   .matches(/^\d{4}-\d{2}-\d{2}$/)
  //   .withMessage("Invalid license expiry date format. Use YYYY-MM-DD."),

  body("experience")
    .optional()
    .isString()
    .withMessage("Experience must be a string."),
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
  createPharmacistValidator,
  updatePharmacistValidator,
  validate,
};
