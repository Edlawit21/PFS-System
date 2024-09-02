const mongoose = require("mongoose");

const pharmacyManagerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pmName: { type: String, required: true, trim: true },
  pharmaName: { type: String, required: true, trim: true },
  licensePM: { type: String, required: true }, // URL or path to the license file
  businessR: { type: String, required: true }, // URL or path to the business registration file
  compliance: { type: String, required: true }, // URL or path to the compliance certificate file
  experience: { type: String, trim: true }, // Optional field for experience
  active: { type: Boolean, default: true },
});

const PharmacyManager = mongoose.model(
  "PharmacyManager",
  pharmacyManagerSchema
);

module.exports = PharmacyManager;
