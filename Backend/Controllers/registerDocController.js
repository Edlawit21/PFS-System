const DoctorRegistration = require("../models/DoctorRegistration");
const User = require("../models/User");
const { sendEmail } = require("../helpers/emailHelper");

exports.registerDoctor = async (req, res) => {
  try {
    const {
      userId,
      docName,
      educationalInfo,
      hospitalName,
      hospitalType,
      specialization,
      certificate,
      experience,
      medicalLicense,
    } = req.body;
    // Validate input data
    if (
      !userId ||
      !docName ||
      !educationalInfo ||
      !hospitalName ||
      !specialization
    ) {
      return res.status(400).json({ error: "Required fields are missing." });
    }
    // Create a new Doctor registration document
    const doctorRegistration = new DoctorRegistration({
      userId,
      docName,
      educationalInfo,
      hospitalName,
      hospitalType,
      specialization,
      certificate,
      experience,
      medicalLicense,
      status: "Pending", // Initial status
    });
    await doctorRegistration.save();

    // Notify the user about the registration receipt
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await sendEmail({
      to: user.email,
      subject: "Doctor Registration Received",
      text: "Thank you for registering as a doctor. Your registration is under review and we will notify you once it is processed.",
    });

    res.status(201).json({
      message:
        "Doctor registration details saved successfully. Your registration is under review.",
    });
  } catch (error) {
    res.status(500).json({ error: "Doctor registration failed" });
  }
};

// Get all doctor registrations
exports.getAllDoctorRegistrations = async (req, res) => {
  try {
    const registrations = await DoctorRegistration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve doctor registrations." });
  }
};

// Get a doctor registration by ID
exports.getDoctorRegistrationById = async (req, res) => {
  try {
    const registration = await DoctorRegistration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: "Doctor registration not found." });
    }
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve doctor registration." });
  }
};

// Update a doctor registration by ID
exports.updateDoctorRegistration = async (req, res) => {
  try {
    const registration = await DoctorRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!registration) {
      return res.status(404).json({ error: "Doctor registration not found." });
    }
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ error: "Doctor registration update failed." });
  }
};

// Delete a doctor registration by ID
exports.deleteDoctorRegistration = async (req, res) => {
  try {
    const registration = await DoctorRegistration.findByIdAndDelete(
      req.params.id
    );
    if (!registration) {
      return res.status(404).json({ error: "Doctor registration not found." });
    }
    res
      .status(200)
      .json({ message: "Doctor registration deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Doctor registration deletion failed." });
  }
};
