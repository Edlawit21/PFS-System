const mongoose = require("mongoose");

const salesTransactionSchema = new mongoose.Schema({
  medicineName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    required: true,
  }, // Pharmacist who made the sale
  // Optionally include other details
  // For example:
  // transactionId: { type: String, unique: true },
  // customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // Reference to a Customer model
  // sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Reference to the seller if applicable
});

const SalesTransaction = mongoose.model(
  "SalesTransaction",
  salesTransactionSchema
);

module.exports = SalesTransaction;
