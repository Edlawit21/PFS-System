const mongoose = require("mongoose");

const pharmacyManagerRegistrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pmName: { type: String, required: true, trim: true },
  pharmaName: { type: String, required: true, trim: true },
  licensePM: { type: String, required: true }, // URL or path to the license file
  businessR: { type: String, required: true }, // URL or path to the business registration file
  compliance: { type: String, required: true }, // URL or path to the compliance certificate file
  experience: { type: String, trim: true }, // Optional field for experience
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  approvalDate: { type: Date },
  reviewerComments: { type: String },
});

const PharmacyManagerRegistration = mongoose.model(
  "PharmacyManagerRegistration",
  pharmacyManagerRegistrationSchema
);

module.exports = PharmacyManagerRegistration;
