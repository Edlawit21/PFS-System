//const User = require('../../Models/Userform/userModel'); this if if the validation is custom like the commented outline made below this import is used

{
  /*const createPharmacyManagerValidator = [
  check('userId')
    .notEmpty().withMessage('User ID is required.')
    .isMongoId().withMessage('Invalid User ID format.')
    .custom(async (userId) => {
      // Check if the user exists and is a pharmacy manager
      const userExists = await User.findById(userId);
      if (!userExists) {
        return Promise.reject('User not found.');
      }
      if (userExists.role !== 'pharmacyManager') {
        return Promise.reject('User is not a Pharmacy Manager.');
      }
      if (!userExists.firstname || !userExists.lastname) {
        return Promise.reject('User registration must be completed before pharmacy manager registration.');
      }
    }),

  body('pmName')
    .notEmpty().withMessage('Pharmacy Manager name is required.')
    .isString().withMessage('Pharmacy Manager name must be a string.'),
  
  body('pharmaName')
    .notEmpty().withMessage('Pharmacy name is required.')
    .isString().withMessage('Pharmacy name must be a string.'),
  
  body('experience')
    .optional()
    .isString().withMessage('Experience must be a string.')
];

module.exports = createPharmacyManagerValidator;
*/
}

const { check, body, validationResult } = require("express-validator");

// Validator for creating a pharmacy manager
const createPharmacyManagerValidator = [
  check("userId")
    .isMongoId()
    .withMessage("Invalid User ID format.")
    .notEmpty()
    .withMessage("User ID is required"),

  body("pmName")
    .notEmpty()
    .withMessage("Pharmacy Manager name is required.")
    .isString()
    .withMessage("Pharmacy Manager name must be a string."),

  body("pharmaName")
    .notEmpty()
    .withMessage("Pharmacy name is required.")
    .isString()
    .withMessage("Pharmacy name must be a string."),

  body("experience")
    .optional()
    .isString()
    .withMessage("Experience must be a string."),
];

// Validator for updating a pharmacy manager
const updatePharmacyManagerValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Pharmacy Manager ID format.")
    .notEmpty()
    .withMessage("User ID is required"),

  body("pmName")
    .optional()
    .isString()
    .withMessage("Pharmacy Manager name must be a string."),

  body("pharmaName")
    .optional()
    .isString()
    .withMessage("Pharmacy name must be a string."),

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
  createPharmacyManagerValidator,
  updatePharmacyManagerValidator,
  validate,
};
