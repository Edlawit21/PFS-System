const PharmacyManagerRegistration = require("../models/PharmacyManagerRegistration");
const User = require("../models/User");
const { sendEmail } = require("../helpers/emailHelper");

exports.registerPharmacyManager = async (req, res) => {
  try {
    const {
      userId,
      pmName,
      pharmaName,
      licensePM,
      businessR,
      compliance,
      experience,
    } = req.body;
    // Validate input data
    if (!userId || !pmName || !pharmaName || !licensePM) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // Create a new Pharmacy Manager registration document
    const pharmacyManagerRegistration = new PharmacyManagerRegistration({
      userId,
      pmName,
      pharmaName,
      licensePM,
      businessR,
      compliance,
      experience,
      status: "Pending", // Initial status
    });
    await pharmacyManagerRegistration.save();

    // Notify the user about the registration receipt
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await sendEmail({
      to: user.email,
      subject: "Pharmacy Manager Registration Received",
      text: "Thank you for registering as a pharmacy manager. Your registration is under review and we will notify you once it is processed.",
    });

    res.status(201).json({
      message:
        "Pharmacy manager registration details saved successfully. Your registration is under review.",
    });
  } catch (error) {
    res.status(500).json({ error: "Pharmacy manager registration failed" });
  }
};
// Get all pharmacy manager registrations
exports.getAllPharmacyManagerRegistrations = async (req, res) => {
  try {
    const registrations = await PharmacyManagerRegistration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve pharmacy manager registrations." });
  }
};

// Get a pharmacy manager registration by ID
exports.getPharmacyManagerRegistrationById = async (req, res) => {
  try {
    const registration = await PharmacyManagerRegistration.findById(
      req.params.id
    );
    if (!registration) {
      return res
        .status(404)
        .json({ error: "Pharmacy manager registration not found." });
    }
    res.status(200).json(registration);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve pharmacy manager registration." });
  }
};

// Update a pharmacy manager registration by ID
exports.updatePharmacyManagerRegistration = async (req, res) => {
  try {
    const registration = await PharmacyManagerRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!registration) {
      return res
        .status(404)
        .json({ error: "Pharmacy manager registration not found." });
    }
    res.status(200).json(registration);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Pharmacy manager registration update failed." });
  }
};

// Delete a pharmacy manager registration by ID
exports.deletePharmacyManagerRegistration = async (req, res) => {
  try {
    const registration = await PharmacyManagerRegistration.findByIdAndDelete(
      req.params.id
    );
    if (!registration) {
      return res
        .status(404)
        .json({ error: "Pharmacy manager registration not found." });
    }
    res
      .status(200)
      .json({ message: "Pharmacy manager registration deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Pharmacy manager registration deletion failed." });
  }
};
