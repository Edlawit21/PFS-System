const DoctorRegistration = require("../../Models/Userform/doctorRegModel");
const User = require("../../Models/Userform/userModel");

// Create a new doctor's registration
exports.createDoctor = async (req, res) => {
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

    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        message:
          "All files (educationalInfo, certificate, medicalLicense) are required.",
      });
    }

    const educationalInfo = req.files["educationalInfo"]
      ? req.files["educationalInfo"][0].path
      : null;
    const certificate = req.files["certificate"]
      ? req.files["certificate"][0].path
      : null;
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

// Update an existing doctor's registration
exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
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

    // Find and update the doctor registration
    const updatedDoctor = await DoctorRegistration.findByIdAndUpdate(
      id,
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
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a doctor's registration details by userId
exports.getDoctorRegistration = async (req, res) => {
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
exports.getAllDoctorRegistrations = async (req, res) => {
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
exports.deleteDoctorRegistration = async (req, res) => {
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

// Get all users with doctor registration details
exports.getAllUsersWithDoctorDetails = async (req, res) => {
  try {
    const users = await User.find({ role: "doctor" });
    const userIds = users.map((user) => user._id);

    const doctorRegistrations = await DoctorRegistration.find({
      userId: { $in: userIds },
    });

    const usersWithDoctorDetails = users.map((user) => {
      const doctorRegistration = doctorRegistrations.find((reg) =>
        reg.userId.equals(user._id)
      );
      return { ...user.toObject(), doctorRegistration };
    });

    res.status(200).json({ usersWithDoctorDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
