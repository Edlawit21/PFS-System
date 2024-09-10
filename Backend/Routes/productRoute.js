const express = require("express");
const productController = require("../controller/productController");
const authMiddleware = require("../Middelware/authMiddleware");
const router = express.Router();
const { pmAuthorization } = require("../Middelware/ppAuthorizationMiddelware");

// Route to create a new product (restricted to Pharmacy Manager)
router.post(
  "/",
  authMiddleware("pharmacyManager"),
  pmAuthorization,
  productController.createProduct
);

// Route to get all products (accessible to Pharmacy Manager and Pharmacist)
router.get(
  "/",
  authMiddleware("pharmacyManager", "pharmacist"),
  productController.getProducts
);

// Route to get a specific product by ID (accessible to Pharmacy Manager and Pharmacist)
router.get(
  "/:id",
  authMiddleware("pharmacyManager", "pharmacist"),
  productController.getProduct
);

// Route to update a product by ID (restricted to Pharmacy Manager)
router.put(
  "/:id",
  authMiddleware("pharmacyManager"),
  pmAuthorization,
  productController.updateProduct
);

// Route to delete a product by ID (restricted to Pharmacy Manager)
router.delete(
  "/:id",
  authMiddleware("pharmacyManager"),
  pmAuthorization,
  productController.deleteProduct
);

module.exports = router;
