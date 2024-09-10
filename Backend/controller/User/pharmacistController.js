const Pharmacist = require("../../Models/PharmacyM/pharmacistRegModel");
const bcrypt = require("bcryptjs");

// Create a new pharmacist
const createPharmacist = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      contact,
      residentialAddress,
      graduationDate,
      licenseNumber,
      licenseExpiryDate,
      experience,
      username,
      password,
    } = req.body;

    // Ensure files are uploaded
    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        message:
          "Education, ID document, and passport photo files are required.",
      });
    }

    const educationFile = req.files["education"]
      ? req.files["education"][0].path
      : null;

    const idDocumentFile = req.files["idDocument"]
      ? req.files["idDocument"][0].path
      : null;

    const passportPhotoFile = req.files["passportPhoto"]
      ? req.files["passportPhoto"][0].path
      : null;

    // Check if the username already exists
    const existingUser = await Pharmacist.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new pharmacist instance
    const pharmacist = new Pharmacist({
      firstname,
      lastname,
      gender,
      contact,
      residentialAddress,
      education: educationFile, // Save file path if uploaded
      idDocument: idDocumentFile, // Save file path if uploaded
      passportPhoto: passportPhotoFile, // Save file path if uploaded
      graduationDate,
      licenseNumber,
      licenseExpiryDate,
      experience,
      username,
      password: hashedPassword, // Save hashed password
      pharmacyManager: req.user._id, // Link the logged-in pharmacy manager to the pharmacist
    });

    // Save the pharmacist to the database
    await pharmacist.save();
    res.status(201).json({ pharmacist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createPharmacist };

// Update an existing pharmacist
const updatePharmacist = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      gender,
      contact,
      residentialAddress,
      graduationDate,
      licenseNumber,
      licenseExpiryDate,
      experience,
      username,
      password,
    } = req.body;

    // Create update fields
    const updateFields = {
      firstname,
      lastname,
      gender,
      contact,
      residentialAddress,
      graduationDate,
      licenseNumber,
      licenseExpiryDate,
      experience,
      username,
    };

    // Handle file uploads
    if (req.files) {
      const educationFile = req.files["education"]
        ? req.files["education"][0].path
        : undefined;

      const idDocumentFile = req.files["idDocument"]
        ? req.files["idDocument"][0].path
        : undefined;

      const passportPhotoFile = req.files["passportPhoto"]
        ? req.files["passportPhoto"][0].path
        : undefined;

      // Update the corresponding fields if the files are present
      if (educationFile) updateFields.education = educationFile;
      if (idDocumentFile) updateFields.idDocument = idDocumentFile;
      if (passportPhotoFile) updateFields.passportPhoto = passportPhotoFile;
    }

    // Handle password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    // Find and update the pharmacist
    const pharmacist = await Pharmacist.findById(id);

    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist not found." });
    }

    // Ensure the logged-in pharmacy manager is the one who created the pharmacist
    if (pharmacist.pharmacyManager.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this pharmacist." });
    }

    const updatedPharmacist = await Pharmacist.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    res.status(200).json({
      message: "Pharmacist updated successfully.",
      pharmacist: updatedPharmacist,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { updatePharmacist };

// Get all pharmacists with optional pharmacy manager details
const getPharmacists = async (req, res) => {
  try {
    const { includeManager = "true" } = req.query; // Default to true

    let query = Pharmacist.find();

    if (includeManager === "true") {
      query = query.populate({
        path: "createdBy", // Assumes 'createdBy' is the field linking to the manager
        select: "firstname lastname", // Customize the fields to include
      });
    }

    const pharmacists = await query.exec();
    res.status(200).json({ pharmacists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPharmacists };

// Get a pharmacist by ID with optional pharmacy manager details
const getPharmacistById = async (req, res) => {
  try {
    const { id } = req.params;
    const { includeManager = "true" } = req.query; // Default to true

    let query = Pharmacist.findById(id);

    if (includeManager === "true") {
      query = query.populate({
        path: "pharmacyManager",
        select: "firstname lastname",
      });
    }

    const pharmacist = await query.exec();

    if (!pharmacist) {
      return res.status(404).json({ msg: "Pharmacist not found." });
    }

    res.status(200).json({ pharmacist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPharmacistById };

// Delete a pharmacist by ID
const deletePharmacist = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Pharmacist.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ msg: "Pharmacist not found." });
    }

    res.status(200).json({ msg: "Pharmacist deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { deletePharmacist };

// Get all pharmacists under a specific manager
const getPharmacistsUnderManager = async (managerId) => {
  try {
    // Fetch pharmacists where the 'createdBy' field matches the managerId
    const pharmacists = await Pharmacist.find({ createdBy: managerId });

    if (!pharmacists.length) {
      throw new Error("No pharmacists found for this manager.");
    }

    return pharmacists.map((pharmacist) => pharmacist._id); // Return only the IDs
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { getPharmacistsUnderManager };
