const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for branches
const BranchSchema = new Schema({
  branchName: { type: String, required: true },
  branchAddress: { type: String, required: true },
});

// Define the schema for the address
const AddressRegistrationSchema = new Schema({
  pharmacyManagerRegistrationId: {
    type: Schema.Types.ObjectId,
    ref: "PharmacyManagerRegistration",
    required: true,
  },
  state: { type: String, required: true },
  city: { type: String, required: true },
  contactNumber: { type: String, required: true },
  branches: [BranchSchema], // Array of branch details
  operatingDays: { type: String, required: true }, // Store operating days and hours as a string
  servicesOffered: [{ type: String, required: true }], // Array of services offered
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  approvalDate: { type: Date },
  reviewerComments: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a model from the schema
const AddressRegistration = mongoose.model(
  "AddressRegistration",
  AddressRegistrationSchema
);

module.exports = AddressRegistration;
