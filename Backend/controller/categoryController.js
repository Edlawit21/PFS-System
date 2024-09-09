// controllers/categoryController.js
const Category = require("../Models/PharmacyM/categoryModel");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    const pharmacyManagerId = req.manager._id; // The logged-in pharmacy manager

    // Create a new category
    const newCategory = new Category({
      category,
      subcategory,
      pharmacyManager: pharmacyManagerId,
    });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all categories created by the logged-in pharmacy manager
exports.getCategories = async (req, res) => {
  try {
    const pharmacyManagerId = req.manager._id; // The logged-in pharmacy manager

    // Fetch categories
    const categories = await Category.find({
      pharmacyManager: pharmacyManagerId,
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single category by ID
exports.getCategory = async (req, res) => {
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
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, subcategory } = req.body;
    const pharmacyManagerId = req.manager._id; // The logged-in pharmacy manager

    // Fetch category
    const categoryToUpdate = await Category.findById(id);
    if (!categoryToUpdate)
      return res.status(404).json({ message: "Category not found" });
    if (
      categoryToUpdate.pharmacyManager.toString() !==
      pharmacyManagerId.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update category
    categoryToUpdate.category = category || categoryToUpdate.category;
    categoryToUpdate.subcategory = subcategory || categoryToUpdate.subcategory;
    await categoryToUpdate.save();

    res.status(200).json(categoryToUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacyManagerId = req.manager._id; // The logged-in pharmacy manager

    // Fetch category
    const categoryToDelete = await Category.findById(id);
    if (!categoryToDelete)
      return res.status(404).json({ message: "Category not found" });
    if (
      categoryToDelete.pharmacyManager.toString() !==
      pharmacyManagerId.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Delete category
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
