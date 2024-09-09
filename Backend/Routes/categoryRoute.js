// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authenticate = require("../middleware/authMiddleware");
const isPharmacyManager = require("../middleware/pharmacyManagerMiddleware");

router.post(
  "/categories",
  authenticate,
  isPharmacyManager,
  categoryController.createCategory
);
router.get(
  "/categories",
  authenticate,
  isPharmacyManager,
  categoryController.getCategories
);
router.get(
  "/categories/:id",
  authenticate,
  isPharmacyManager,
  categoryController.getCategory
);
router.put(
  "/categories/:id",
  authenticate,
  isPharmacyManager,
  categoryController.updateCategory
);
router.delete(
  "/categories/:id",
  authenticate,
  isPharmacyManager,
  categoryController.deleteCategory
);

module.exports = router;
