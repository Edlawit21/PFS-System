const mongoose = require("mongoose");

const salesTransactionSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
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
