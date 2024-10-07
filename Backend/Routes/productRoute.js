const express = require("express");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAll,
  searchProducts,
} = require("../controller/productController"); // Ensure this path is correct
const authMiddleware = require("../Middelware/authMiddleware"); // Ensure this path is correct
const router = express.Router();

// Route to create a new product (restricted to Pharmacy Manager)
router.post("/createProduct", authMiddleware("pharmacyManager"), createProduct);

// Route to get all products (accessible to Pharmacy Manager and Pharmacist)
router.get(
  "/getallProduct",
  authMiddleware("pharmacyManager", "pharmacist"),
  searchProducts
);

// Route to get a specific product by ID (accessible to Pharmacy Manager and Pharmacist)
router.get("/:id", authMiddleware("pharmacyManager", "pharmacist"), getProduct);

// Route to update a product by ID (restricted to Pharmacy Manager)
router.put("/:id", authMiddleware("pharmacyManager"), updateProduct);

// Route to delete a product by ID (restricted to Pharmacy Manager)
router.delete("/:id", authMiddleware("pharmacyManager"), deleteProduct);

router.get(
  "/allproduct",
  // authMiddleware("pharmacyManager", "pharmacist"),
  getAll
);

module.exports = router;
