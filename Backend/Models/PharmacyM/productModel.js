const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    medname: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    actualPrice: {
      type: Number,
      required: true,
    },
    sellPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    registerDate: {
      type: Date,
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    soldQty: {
      type: Number,
      default: 0,
    },
    remainQty: {
      type: Number,
      default: function () {
        return this.quantity - this.soldQty;
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PharmacyManager", // Reference to the Pharmacy Manager who created this product
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
