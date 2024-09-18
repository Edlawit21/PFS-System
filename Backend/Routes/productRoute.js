const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController"); // Ensure this path is correct
const authMiddleware = require("../Middelware/authMiddleware"); // Ensure this path is correct
const router = express.Router();

// Route to create a new product (restricted to Pharmacy Manager)
router.post("/createProduct", authMiddleware("pharmacyManager"), createProduct);

// Route to get all products (accessible to Pharmacy Manager and Pharmacist)
router.get(
  "/getallProduct",
  authMiddleware("pharmacyManager", "pharmacist"),
  getProducts
);

// Route to get a specific product by ID (accessible to Pharmacy Manager and Pharmacist)
router.get(
  "/product/:id",
  authMiddleware("pharmacyManager", "pharmacist"),
  getProduct
);

// Route to update a product by ID (restricted to Pharmacy Manager)
router.put("/product/:id", authMiddleware("pharmacyManager"), updateProduct);

// Route to delete a product by ID (restricted to Pharmacy Manager)
router.delete("/product/:id", authMiddleware("pharmacyManager"), deleteProduct);

module.exports = router;
