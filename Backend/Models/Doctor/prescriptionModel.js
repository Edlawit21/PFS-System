const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    datePicker: {
      type: Date,
      required: true,
    },
    patient: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
      },
      phonenumber: {
        type: String,
        required: true,
      },
      allergies: {
        type: String,
      },
      condition: {
        type: String,
      },
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
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phonenumber: {
        type: String,
        required: true,
      },
    },
    signature: {
      type: String, // Assuming this is stored as a base64 string
      required: true,
    },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
