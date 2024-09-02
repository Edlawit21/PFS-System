const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    medname: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference the Category model again
      required: true,
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Product", productSchema);
