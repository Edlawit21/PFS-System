const Prescription = require("../Models/Doctor/prescriptionModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Controller to create a new prescription
const createPrescription = async (req, res) => {
  try {
    // Destructure directly and handle nested properties
    const {
      prescriptionDate,
      signature,
      patient = {}, // Default to empty object if patient is undefined
      medications = [], // Default to empty array if medications is undefined
      physician = {}, // Default to empty object if physician is undefined
    } = req.body;
    // Retrieve the file path from the request
    // const signature = req.file ? req.file.path : null; // Get file path
    const {
      name: { first: patientFirst = "", last: patientLast = "" } = {},
      age,
      gender,
      phonenumber,
      allergies,
      condition,
    } = patient;

    const {
      name: { first: physicianFirst = "", last: physicianLast = "" } = {},
      phonenumber: physicianPhonenumber,
    } = physician;

    // Get the token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Create a new prescription instance using the request body and add the doctor's ID
    const newPrescription = new Prescription({
      prescriptionDate,
      patient: {
        name: {
          first: patientFirst,
          last: patientLast,
        },
        age,
        gender,
        phonenumber,
        allergies: allergies || "",
        condition: condition || "",
      },
      medications: medications.map((med) => ({
        medicationName: med.medicationName,
        dosage: med.dosage,
        frequency: med.frequency,
        route: med.route,
        purpose: med.purpose || "",
      })),
      physician: {
        name: {
          first: physicianFirst,
          last: physicianLast,
        },
        phonenumber: physicianPhonenumber,
      },
      signature,
      createdBy: decoded.id,
    });
    console.log("Received request body:", req.body);
    // Save the new prescription to the database
    const savedPrescription = await newPrescription.save();

    // Respond with the saved prescription data
    res.status(201).json({
      message: "Prescription created successfully",
      data: savedPrescription,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to update a prescription by ID
const updatePrescriptionById = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find and update the prescription by its ID
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validation on update
      }
    );

    // If the prescription is not found, respond with a 404 error
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Respond with the updated prescription
    res
      .status(200)
      .json({ message: "Prescription updated successfully", prescription });
  } catch (error) {
    // Handle errors during updating the prescription
    res
      .status(500)
      .json({ message: "Error updating prescription", error: error.message });
  }
};

// Controller to get all prescriptions
const getAllPrescriptions = async (req, res) => {
  try {
    // Fetch all prescriptions from the database
    const prescriptions = await Prescription.find();

    // Respond with the list of prescriptions
    res.status(200).json(prescriptions);
  } catch (error) {
    // Handle errors during fetching prescriptions
    res
      .status(500)
      .json({ message: "Error fetching prescriptions", error: error.message });
  }
};

// Controller to get a single prescription by ID
const getPrescriptionById = async (req, res) => {
  try {
    // Fetch a prescription by its ID
    const prescription = await Prescription.findById(req.params.id);

    // If the prescription is not found, respond with a 404 error
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Respond with the found prescription
    res.status(200).json(prescription);
  } catch (error) {
    // Handle errors during fetching the prescription
    res
      .status(500)
      .json({ message: "Error fetching prescription", error: error.message });
  }
};

// Controller to delete a prescription by ID
const deletePrescriptionById = async (req, res) => {
  try {
    // Find and delete the prescription by its ID
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    // If the prescription is not found, respond with a 404 error
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (error) {
    // Handle errors during deleting the prescription
    res
      .status(500)
      .json({ message: "Error deleting prescription", error: error.message });
  }
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescriptionById,
  deletePrescriptionById,
};
