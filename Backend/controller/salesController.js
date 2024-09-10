const Product = require("../Models/PharmacyM/productModel");
const SalesTransaction = require("../Models/Pharmacist/salesModel");
const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");

// Controller to handle making a sale
const makeSale = async (req, res) => {
  try {
    const { medicineId, quantity, pharmacistId } = req.body;

    // Fetch the pharmacist's details to get the associated Pharmacy Manager (PM)
    const pharmacist = await Pharmacist.findById(pharmacistId);
    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }

    // Fetch the product, ensuring it belongs to the same PM who created the pharmacist
    const product = await Product.findOne({
      _id: medicineId,
      pharmacyManager: pharmacist.pharmacyManager, // Ensure the product belongs to the same PM
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found or not authorized to sell this product",
      });
    }

    // Check if there is enough stock
    if (product.quantityInStock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Calculate total price for the transaction
    const totalPrice = product.price * quantity;

    // Deduct stock
    product.quantityInStock -= quantity;
    await product.save();

    // Record the sale transaction
    const transaction = new SalesTransaction({
      medicine: medicineId,
      quantity,
      totalPrice,
      pharmacist: pharmacistId,
    });

    // Save the transaction
    await transaction.save();

    res
      .status(201)
      .json({ message: "Sale recorded successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error processing the sale", error });
  }
};

module.exports = { makeSale };

// Controller to fetch all sales transactions for a specific pharmacist
const getSalesTransactions = async (req, res) => {
  try {
    const { pharmacistId } = req.params;

    // Fetch all sales transactions for the pharmacist
    const transactions = await SalesTransaction.find({
      pharmacist: pharmacistId,
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSalesTransactions };

// Controller to delete a specific sales transaction
const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Find and delete the transaction by its ID
    const transaction = await SalesTransaction.findByIdAndDelete(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};

module.exports = { deleteTransaction };

// Controller to update a specific sales transaction
const updateTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const updates = req.body;
    // Find the transaction and update it
    const transaction = await SalesTransaction.findByIdAndUpdate(
      transactionId,
      updates,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res
      .status(200)
      .json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
  }
};

module.exports = {
  updateTransaction,
};
