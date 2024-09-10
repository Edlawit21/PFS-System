const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const authMiddleware = require("../Middelware/authMiddleware");
const { pmAuthorization } = require("../Middelware/ppAuthorizationMiddelware");

// Routes for pharmacy manager
router.post(
  "/",
  authMiddleware("pharmacyManager"),
  pmAuthorization,
  categoryController.createCategory
);
router.get(
  "/",
  authMiddleware("pharmacyManager"),
  pmAuthorization,
  categoryController.getCategories
);
router.get(
  "/:id",
  authMiddleware("pharmacyManager"),
  pmAuthorization,
  categoryController.getCategory
);
router.put(
  "/:id",
  authMiddleware("pharmacyManager"),
  pmAuthorization,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  authMiddleware("pharmacyManager"),
  pmAuthorization,
  categoryController.deleteCategory
);

module.exports = router;
