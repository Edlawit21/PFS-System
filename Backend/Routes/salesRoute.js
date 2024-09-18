const express = require("express");
const router = express.Router();

// Import Controllers
const {
  makeSale,
  getSalesTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controller/salesController");

const authMiddleware = require("../Middelware/authMiddleware");

// Routes

// POST: Create a sale transaction (pharmacist only)
router.post("/createSales", authMiddleware("pharmacist"), makeSale);

// GET: Fetch all sales transactions for a specific pharmacist (pharmacist only)
router.get(
  "/sales/:pharmacistId",
  authMiddleware("pharmacist"), // Ensure pharmacist role is required
  getSalesTransactions
);

// DELETE: Delete a specific sales transaction (pharmacist only)
router.delete(
  "/sales/:transactionId",
  authMiddleware("pharmacist"), // Ensure pharmacist role is required
  deleteTransaction
);

// PUT: Update a specific sales transaction (pharmacist only)
router.put(
  "/sales/:transactionId",
  authMiddleware("pharmacist"), // Ensure pharmacist role is required
  updateTransaction
);

module.exports = router;
