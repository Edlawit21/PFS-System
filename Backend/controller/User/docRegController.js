const DoctorRegistration = require("../../Models/Userform/doctorRegModel");
const User = require("../../Models/Userform/userModel");

// Create a new doctor's registration
const createDoctor = async (req, res) => {
  try {
    const {
      userId,
      docName,
      hospitalName,
      hospitalType,
      specialization,
      experience,
      pin,
    } = req.body;

    if (!req.files || req.files.length < 2) {
      return res.status(400).json({
        message: "Educational Info and Medical License are required.",
      });
    }

    const educationalInfo = req.files["educationalInfo"]
      ? req.files["educationalInfo"][0].path
      : null;
    const certificate = req.files["certificate"]
      ? req.files["certificate"][0].path
      : null; // Optional
    const medicalLicense = req.files["medicalLicense"]
      ? req.files["medicalLicense"][0].path
      : null;

    // Ensure the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    if (userExists.role !== "doctor") {
      return res.status(400).json({ message: "User is not a Doctor." });
    }

    // Check if user registration is completed
    if (!userExists.firstname || !userExists.lastname) {
      return res.status(400).json({
        message:
          "User registration must be completed before doctor registration.",
      });
    }

    // Create a new doctor registration
    const newDoctorRegistration = new DoctorRegistration({
      userId,
      docName,
      educationalInfo,
      hospitalName,
      hospitalType,
      specialization,
      certificate,
      experience,
      medicalLicense,
      pin,
    });

    await newDoctorRegistration.save();

    res.status(201).json({
      message: "Doctor registration completed successfully.",
      doctorRegistration: newDoctorRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      docName,
      hospitalName,
      hospitalType,
      specialization,
      experience,
      pin,
    } = req.body;

    // Ensure document fields are updated if they exist
    const updateFields = {
      docName,
      hospitalName,
      hospitalType,
      specialization,
      experience,
      pin,
    };

    if (req.files) {
      updateFields.educationalInfo = req.files["educationalInfo"]
        ? req.files["educationalInfo"][0].path
        : undefined;
      updateFields.certificate = req.files["certificate"]
        ? req.files["certificate"][0].path
        : undefined;
      updateFields.medicalLicense = req.files["medicalLicense"]
        ? req.files["medicalLicense"][0].path
        : undefined;
    }

    // Remove fields with undefined values
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    // Find and update the doctor registration by userId
    const updatedDoctor = await DoctorRegistration.findOneAndUpdate(
      { userId },
      updateFields,
      { new: true }
    );

    if (!updatedDoctor) {
      return res
        .status(404)
        .json({ message: "Doctor registration not found." });
    }

    res.status(200).json({
      message: "Doctor registration updated successfully.",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor registration:", error); // Log the error to the server console
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a doctor's registration details by userId
const getDoctorRegistration = async (req, res) => {
  try {
    const { userId } = req.params;
    const doctorRegistration = await DoctorRegistration.findOne({ userId });

    if (!doctorRegistration) {
      return res
        .status(404)
        .json({ message: "Doctor registration not found." });
    }

    res.status(200).json({ doctorRegistration });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all doctor registrations with pagination
const getAllDoctorRegistrations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of records per page
    const skip = (page - 1) * limit; // Calculate records to skip

    const doctorRegistrations = await DoctorRegistration.find()
      .skip(skip)
      .limit(limit);

    const count = await DoctorRegistration.countDocuments(); // Total number of records

    res.status(200).json({
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      doctorRegistrations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a doctor's registration by userId
const deleteDoctorRegistration = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete the doctor registration
    const doctorRegistration = await DoctorRegistration.findOneAndDelete({
      userId,
    });

    if (!doctorRegistration) {
      return res
        .status(404)
        .json({ message: "Doctor registration not found." });
    }

    res
      .status(200)
      .json({ message: "Doctor registration deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createDoctor,
  updateDoctor,
  getDoctorRegistration,
  getAllDoctorRegistrations,
  deleteDoctorRegistration,
};
