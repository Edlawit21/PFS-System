const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  docName: { type: String, required: true, trim: true },
  educationalInfo: { type: String, required: true },
  hospitalName: { type: String, required: true, trim: true },
  hospitalType: { type: String, enum: ["Private", "Public"], required: true },
  specialization: { type: String, trim: true },
  certificate: { type: String },
  experience: { type: String, required: true, trim: true },
  medicalLicense: { type: String, required: true },
  active: { type: Boolean, default: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
