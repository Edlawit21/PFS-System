const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const authMiddleware = require("../Middelware/authMiddleware");

// Routes for pharmacy manager
router.post(
  "/createCategory",
  authMiddleware("pharmacyManager"),
  categoryController.createCategory
);
router.get(
  "/allCategory",
  authMiddleware("pharmacyManager"),

  categoryController.getCategories
);
router.get(
  "/category/:id",
  authMiddleware("pharmacyManager"),

  categoryController.getCategory
);
router.put(
  "/category/:id",
  authMiddleware("pharmacyManager"),

  categoryController.updateCategory
);
router.delete(
  "/category/:id",
  authMiddleware("pharmacyManager"),

  categoryController.deleteCategory
);

module.exports = router;
