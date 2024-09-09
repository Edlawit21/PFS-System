const mongoose = require("mongoose");
const crypto = require("crypto");

const forgetPasswordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    resetToken: {
      type: String,
      required: [true, "A reset token is required"],
    },
    resetTokenExpires: {
      type: Date,
      required: [true, "A reset token expiry date is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt' fields
  }
);

// Generate a reset token and expiry date
forgetPasswordSchema.methods.createResetToken = function () {
  // Create a reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token and set the resetToken and resetTokenExpires fields
  this.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour

  return resetToken;
};

const ForgetPassword = mongoose.model("ForgetPassword", forgetPasswordSchema);

module.exports = ForgetPassword;
