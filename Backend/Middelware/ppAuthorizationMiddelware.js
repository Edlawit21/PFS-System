const jwt = require("jsonwebtoken");
//const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");
//const PharmacyManager = require("../Models/PharmacyM/pharmacyManagerModel");
const Product = require("../Models/PharmacyM/productModel");

// Middleware to ensure that a PM manages only their own products and categories
const pmAuthorization = async (req, res, next) => {
  try {
    const productId = req.params.productId || req.body.productId;
    const pharmacyManagerId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Ensure the PM managing the product is the one who created it
    if (product.pharmacyManager.toString() !== pharmacyManagerId.toString()) {
      return res
        .status(403)
        .json({ msg: "Access denied: Unauthorized to manage this product" });
    }

    next();
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Middleware to ensure a pharmacist accesses only products from their PM
const pharmacistAuthorization = async (req, res, next) => {
  try {
    const productId = req.params.productId || req.body.productId;
    const pharmacist = req.user;

    // Fetch product to verify its PM
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Ensure the product is from the pharmacist's PM
    if (
      product.pharmacyManager.toString() !==
      pharmacist.pharmacyManager.toString()
    ) {
      return res
        .status(403)
        .json({ msg: "Access denied: Unauthorized to access this product" });
    }

    next();
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  pmAuthorization,
  pharmacistAuthorization,
};
