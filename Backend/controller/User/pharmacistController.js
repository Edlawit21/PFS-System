const Pharmacist = require("../../Models/PharmacyM/pharmacistRegModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new pharmacist
const createPharmacist = async (req, res) => {
  try {
    console.log(req.body);

    const {
      firstname,
      lastname,
      gender,
      residentialAddress,
      graduationDate,
      licenseNumber,
      licenseExpiryDate,
      experience,
      username,
      password,
    } = req.body;

    const contact = JSON.parse(req.body.contact);
    // Ensure files are uploaded
    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        message:
          "Education, ID document, and passport photo files are required.",
      });
    }

    const educationFile = req.files["education"]
      ? "Uploads/documents" + req.files["education"][0].filename
      : null;

    const idDocumentFile = req.files["idDocument"]
      ? "Uploads/documents" + req.files["idDocument"][0].filename
      : null;

    const passportPhotoFile = req.files["passportPhoto"]
      ? "Uploads/documents" + req.files["passportPhoto"][0].filename
      : null;

    // Check if the username already exists
    const existingUser = await Pharmacist.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const token = req.cookies.token;
    console.log("Token from cookies:", token); // Add this for debugging
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log the decoded token
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
      password,
      createdBy: decoded.id, // Link the logged-in pharmacy manager to the pharmacist
    });

    // Save the pharmacist to the database
    await pharmacist.save();
    res.status(201).json({ pharmacist });
  } catch (error) {
    console.error("Error during registration:", error); // Log error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
    if (pharmacist.createdBy.toString() !== req.user._id.toString()) {
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

// Get all pharmacists with optional pharmacy manager details
const getPharmacists = async (req, res) => {
  try {
    const managerId = req.user.id;
    // Fetch all pharmacists and populate the createdBy field to link to the pharmacy manager
    const pharmacists = await Pharmacist.find({ createdBy: managerId })
      .populate({
        path: "createdBy", // Ensure this references the correct field and model
        select: "firstname lastname", // Selecting only necessary fields
      })
      .exec();
    if (!pharmacists.length) {
      return res
        .status(404)
        .json({ message: "No pharmacists found for this manager." });
    }

    res.status(200).json({ pharmacists });
  } catch (error) {
    console.error("Error fetching pharmacists:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
};

// Get a pharmacist by ID with optional pharmacy manager details
const getPharmacistById = async (req, res) => {
  try {
    const { id } = req.params;
    const { includeManager = "true" } = req.query; // Default to true

    let query = Pharmacist.findById(id);

    if (includeManager === "true") {
      query = query.populate({
        path: "createdBy",
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
module.exports = {
  createPharmacist,
  updatePharmacist,
  getPharmacists,
  getPharmacistById,
  deletePharmacist,
  getPharmacistsUnderManager,
};
