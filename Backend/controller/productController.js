const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");
const Product = require("../Models/PharmacyM/productModel");
const jwt = require("jsonwebtoken");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      medname,
      category,
      actualPrice,
      sellPrice,
      quantity,
      registerDate,
      expireDate,
    } = req.body;

    const pharmacyManagerId = req.user._id; // Assuming the user's ID is attached to req.user (Pharmacy Manager)
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Create a new product and associate it with the pharmacy manager
    const newProduct = new Product({
      medname,
      category,
      actualPrice,
      sellPrice,
      quantity,
      registerDate,
      expireDate,
      createdBy: decoded.id, // Set the pharmacy manager ID
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); // Respond with the created product
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products for the logged-in pharmacy manager or pharmacist (under the same PM)
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query; // Extracting the search query

    // Log incoming request for debugging
    console.log("Incoming user:", req.user);

    // Check if the query parameter is provided
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    let pharmacyManagerId;

    // Determine pharmacyManagerId based on user role
    if (req.user.role === "pharmacyManager") {
      pharmacyManagerId = req.user._id; // PM fetching their own products
    } else if (req.user.role === "pharmacist") {
      // Get the associated Pharmacy Manager ID from createdBy field
      pharmacyManagerId = req.user.createdBy; // Assuming this is the correct field
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    // Log the determined pharmacyManagerId for debugging
    console.log("Pharmacy Manager ID:", pharmacyManagerId);
    console.log("Search query:", query);

    // Fetch products based on pharmacyManagerId and the search query
    const products = await Product.find({
      createdBy: pharmacyManagerId,
      medname: { $regex: new RegExp(query, "i") }, // Search using regex for case-insensitive match
    }).populate("category", "category subcategory");

    // Log found products
    console.log("Products found:", products);

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({ message: "No medicines found" });
    }

    // Respond with the found products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all products for the logged-in pharmacy manager or pharmacist (under the same PM)
const getAll = async (req, res) => {
  try {
    const pharmacy = await Pharmacist.find();
    // Find all products created by the pharmacy manager
    const products = await Product.findOne({
      createdBy: pharmacyManagerId,
    })
      .populate("category", "category") // Populate category field
      .populate("subcategory", "subcategory"); // Populate subcategory if needed

    res.status(200).json({ products, pharmacyManager }); // Respond with the products
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific product by its ID for the logged-in pharmacy manager or pharmacist (under the same PM)
const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const user = req.user;

    let pharmacyManagerId;

    if (user.role === "pharmacyManager") {
      pharmacyManagerId = user._id;
    } else if (user.role === "pharmacist") {
      pharmacyManagerId = user.assignedPharmacyManager;
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find the product by ID and pharmacy manager
    const product = await Product.findOne({
      _id: productId,
      createdBy: pharmacyManagerId,
    }).populate("category", "category subcategory");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product); // Respond with the product
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product by its ID for the logged-in pharmacy manager only
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const pharmacyManagerId = req.user._id;

    if (req.user.role !== "pharmacyManager") {
      return res
        .status(403)
        .json({ message: "Only the Pharmacy Manager can update products" });
    }

    // Find the product by ID and update it
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, createdBy: pharmacyManagerId },
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate it
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct); // Respond with the updated product
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by its ID for the logged-in pharmacy manager only
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const pharmacyManagerId = req.user._id;

    if (req.user.role !== "pharmacyManager") {
      return res
        .status(403)
        .json({ message: "Only the Pharmacy Manager can delete products" });
    }

    // Find the product by ID and delete it
    const deletedProduct = await Product.findOneAndDelete({
      _id: productId,
      createdBy: pharmacyManagerId,
    });

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" }); // Respond with a success message
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getAll,
  searchProducts,
  deleteProduct,
};
