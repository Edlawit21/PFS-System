const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    prescriptionDate: {
      type: Date,
      required: true,
    },
    patient: {
      name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
      },
      age: { type: Number, required: true },
      gender: { type: String, enum: ["Male", "Female"], required: true },
      phonenumber: { type: String, required: true }, // Consider using String for phone numbers
      allergies: { type: String },
      condition: { type: String },
    },
    medications: [
      {
        medicationName: {
          type: String,
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
        frequency: {
          type: String,
          required: true,
        },
        route: {
          type: String,
          required: true,
        },
        purpose: {
          type: String,
        },
      },
    ],
    physician: {
      name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
      },
      phonenumber: { type: String, required: true },
    },
    signature: {
      type: String, // Assuming this is stored as a base64 string
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorRegistration", // Reference to the Doctor model
      required: true,
    },
    qr: {
      type: String,
    },
    purchased: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
