const mongoose = require("mongoose");

const doctorRegistrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  docName: { type: String, required: true, trim: true },
  educationalInfo: { type: String, required: true }, // URL or path to the educational information file
  hospitalName: { type: String, required: true, trim: true },
  hospitalType: {
    type: [String], // Array of strings for multiple selections
    required: true,
    message: "Please choose a hospital type!",
    validate: (value) => value.length > 0, // Custom validation
  },

  specialization: { type: String, trim: true },
  certificate: { type: String }, // URL or path to the certificate file
  experience: { type: String, required: true, trim: true },
  medicalLicense: { type: String, required: true }, // URL or path to the medical license file
  pin: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  approvalDate: { type: Date },
});

const DoctorRegistration = mongoose.model(
  "DoctorRegistration",
  doctorRegistrationSchema
);

module.exports = DoctorRegistration;
