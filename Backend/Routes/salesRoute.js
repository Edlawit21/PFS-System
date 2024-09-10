const express = require("express");
const router = express.Router();

// Import Controllers
const {
  makeSale,
  getSalesTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controller/salesController");
const {
  pharmacistAuthorization,
} = require("../Middelware/ppAuthorizationMiddelware");
const authMiddleware = require("../Middelware/authMiddleware");

// Routes

// POST: Create a sale transaction (pharmacist only)
router.post(
  "/sales",
  authMiddleware("pharmacist"),
  pharmacistAuthorization,
  makeSale
);

// GET: Fetch all sales transactions for a specific pharmacist (pharmacist only)
router.get(
  "/sales/:pharmacistId",
  authMiddleware("pharmacist"),
  pharmacistAuthorization,
  getSalesTransactions
);

// DELETE: Delete a specific sales transaction (pharmacist only)
router.delete(
  "/sales/:transactionId",
  authMiddleware("pharmacist"),
  pharmacistAuthorization,
  deleteTransaction
);

// PUT: Update a specific sales transaction (pharmacist only)
router.put(
  "/sales/:transactionId",
  authMiddleware("pharmacist"),
  pharmacistAuthorization,
  updateTransaction
);

module.exports = router;
