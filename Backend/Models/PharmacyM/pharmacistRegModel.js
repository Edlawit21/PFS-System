const mongoose = require("mongoose");

const registerPharmacistSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    residentialAddress: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    idDocument: {
      type: String,
      required: true,
    },
    graduationDate: {
      type: Date,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    licenseExpiryDate: {
      type: Date,
      required: true,
    },
    experience: {
      type: String,
    },
    passportPhoto: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Pharmacist", registerPharmacistSchema);
