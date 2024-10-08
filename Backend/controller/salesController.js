const Product = require("../Models/PharmacyM/productModel");
const SalesTransaction = require("../Models/Pharmacist/salesModel");
const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");
const jwt = require("jsonwebtoken");

// Controller to handle making a sale
const makeSale = async (req, res) => {
  try {
    const { medicineId, quantity, prescriptionId } = req.body; // Accept prescriptionId

    // Verify JWT token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract pharmacistId from the token
    const pharmacistId = decoded.id;

    // Fetch the pharmacist's details
    const pharmacist = await Pharmacist.findById(pharmacistId);
    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }

    // Fetch the product
    const product = await Product.findOne({
      _id: medicineId,
      createdBy: pharmacist.createdBy,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found or not authorized to sell this product",
      });
    }

    // Check if there is enough stock
    if (product.remainQty < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Calculate total price
    const totalPrice = product.sellPrice * quantity;

    // Deduct stock
    product.remainQty -= quantity; // Deduct the quantity from the remaining stock
    await product.save(); // Save the updated product

    // Record the sale transaction
    const transaction = new SalesTransaction({
      medicineId: product._id, // Store the product ID
      medicineName: product.medname, // Store the product name
      quantity,
      remainQty: product.remainQty, // Update this to use the new remainQty
      totalPrice,
      date: new Date(),
      pharmacist: pharmacistId,
    });

    // Save the transaction
    const savedTransaction = await transaction.save();

    // If a prescriptionId is provided, update the purchase status
    if (prescriptionId) {
      const prescription = await Prescription.findById(prescriptionId);
      if (prescription) {
        prescription.purchased = true; // Set purchased status to true
        await prescription.save(); // Save the updated prescription
        console.log(`Updated prescription ${prescriptionId} to purchased.`);
      } else {
        console.log(`Prescription not found with ID: ${prescriptionId}`);
      }
    }

    res.status(201).json({
      message: "Sale recorded successfully",
      transaction: {
        medicineId: savedTransaction.medicineId,
        medicineName: savedTransaction.medicineName,
        remainQty: savedTransaction.remainQty,
        quantity: savedTransaction.quantity,
        totalPrice: savedTransaction.totalPrice,
        date: savedTransaction.date,
        pharmacist: savedTransaction.pharmacist,
        _id: savedTransaction._id,
      },
    });
  } catch (error) {
    console.error("Error processing the sale:", error);
    res.status(500).json({ message: "Error processing the sale", error });
  }
};

module.exports = { makeSale };

// Controller to fetch all sales transactions for a specific pharmacist
const getSalesTransactions = async (req, res) => {
  try {
    const { pharmacistId } = req.params;
    console.log("Fetching transactions for pharmacist:", pharmacistId);

    // Fetch all sales transactions for the pharmacist and populate medicineName
    const transactions = await SalesTransaction.find({
      pharmacist: pharmacistId,
    }).populate("medicineName"); // Populate to get the medicine name

    console.log("Raw transactions:", transactions); // Debugging line

    // Format transactions to include medicine name
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction.toObject(),
      medicineName: transaction.medname ? transaction.medname : null, // Access the actual medicine name
    }));

    res.status(200).json(formattedTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
  makeSale,
  getSalesTransactions,
  deleteTransaction,
  updateTransaction,
};
