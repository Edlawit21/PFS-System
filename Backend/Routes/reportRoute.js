const express = require("express");
const router = express.Router();
const {
  generateSalesReport,
  getSalesReport,
} = require("../controller/reportController");
const {
  authorizePharmacist,
  authorizePharmacyManager,
  authorizeReportAccess,
} = require("../Middelware/ppReportMiddelware");
const authMiddleware = require("../Middelware/authMiddleware");
// Routes

// POST: Generate sales report for a pharmacist (only for the authenticated pharmacist)
router.post(
  "/sales-report",
  authMiddleware("pharmacist"),
  authorizePharmacist,
  generateSalesReport
);

// GET: Get sales reports within a date range (for pharmacist or pharmacy manager)
router.get(
  "/sales-reports",
  authMiddleware("pharmacist", "pharmacyManager"),
  authorizeReportAccess,
  authorizePharmacyManager,
  getSalesReport
);

module.exports = router;
