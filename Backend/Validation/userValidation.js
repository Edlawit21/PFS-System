const { body, check, validationResult } = require("express-validator");

// Validation rules for user creation
const createUserValidator = [
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

  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address."),

  body("username")
    .notEmpty()
    .withMessage("Username is required.")
    .isString()
    .withMessage("Username must be a string."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character."),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required.")
    .isMobilePhone()
    .withMessage("Invalid phone number."),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn(["male", "female"])
    .withMessage("Invalid gender."),

  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn(["doctor", "pharmacyManager"])
    .withMessage("Invalid role."),
];

// Validation rules for user updates
const updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID format"),

  body("firstname")
    .optional()
    .isString()
    .withMessage("First name must be a string."),

  body("lastname")
    .optional()
    .isString()
    .withMessage("Last name must be a string."),

  body("email").optional().isEmail().withMessage("Invalid email address."),

  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string."),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character."),

  body("phoneNumber")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number."),

  body("gender")
    .optional()
    .isIn(["male", "female"])
    .withMessage("Invalid gender."),

  body("role")
    .optional()
    .isIn(["doctor", "pmanager"])
    .withMessage("Invalid role."),
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
  createUserValidator,
  updateUserValidator,
  validate,
};
