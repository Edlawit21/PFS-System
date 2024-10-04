const mongoose = require("mongoose");

const salesTransactionSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    required: true,
  },
});

const SalesTransaction = mongoose.model(
  "SalesTransaction",
  salesTransactionSchema
);

module.exports = SalesTransaction;
