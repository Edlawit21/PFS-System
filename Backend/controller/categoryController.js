// controllers/categoryController.js
const mongoose = require("mongoose");
const Category = require("../Models/PharmacyM/categoryModel");
const jwt = require("jsonwebtoken");

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    const pharmacyManagerId = req.user._id; // The logged-in pharmacy manager
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Create a new category
    const newCategory = new Category({
      category,
      subcategory,
      createdBy: decoded.id,
    });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all categories created by the logged-in pharmacy manager
const getCategories = async (req, res) => {
  try {
    const pharmacyManagerId = req.user._id; // The logged-in pharmacy manager

    // Fetch categories
    const categories = await Category.find({
      createdBy: pharmacyManagerId,
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single category by ID
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacyManagerId = req.manager._id; // The logged-in pharmacy manager

    // Fetch category
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    if (category.pharmacyManager.toString() !== pharmacyManagerId.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, subcategory } = req.body;
    const pharmacyManagerId = req.user._id;

    console.log(`Updating category ID: ${id}, New Values:`, {
      category,
      subcategory,
    });

    const categoryToUpdate = await Category.findById(id);
    if (!categoryToUpdate) {
      console.error("Category not found");
      return res.status(404).json({ message: "Category not found" });
    }

    if (
      categoryToUpdate.createdBy.toString() !== pharmacyManagerId.toString()
    ) {
      console.error("Access denied");
      return res.status(403).json({ message: "Access denied" });
    }

    // Perform updates
    if (category) categoryToUpdate.category = category;
    if (subcategory) categoryToUpdate.subcategory = subcategory;

    await categoryToUpdate.save();

    console.log("Updated category:", categoryToUpdate);
    res.status(200).json(categoryToUpdate);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the user ID from the token
    const userId = req.user.id; // Assuming you have set req.user in your middleware

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Fetch category
    const categoryToDelete = await Category.findById(id);

    // Check if the category exists
    if (!categoryToDelete) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Ensure the user owns the category
    if (categoryToDelete.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Delete the category
    await Category.findByIdAndDelete(id);

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error: ", error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
