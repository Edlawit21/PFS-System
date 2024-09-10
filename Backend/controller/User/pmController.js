const PharmacyManagerRegistration = require("../../Models/Userform/pmRegModel");
const User = require("../../Models/Userform/userModel");

// Create a new pharmacy manager's registration
const createPharmacyManager = async (req, res) => {
  try {
    const { userId, pmName, pharmaName, experience } = req.body;

    // Ensure files are uploaded
    if (!req.files || Object.keys(req.files).length < 3) {
      return res.status(400).json({
        message:
          "All files (compliance, license, business registration) are required.",
      });
    }

    const compliance = req.files["compliance"]
      ? req.files["compliance"][0].path
      : null;
    const licensePM = req.files["licensePM"]
      ? req.files["licensePM"][0].path
      : null;
    const businessR = req.files["businessR"]
      ? req.files["businessR"][0].path
      : null;

    // Ensure the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    if (userExists.role !== "pharmacyManager") {
      return res
        .status(400)
        .json({ message: "User is not a Pharmacy Manager." });
    }

    // Check if user registration is completed
    if (!userExists.firstname || !userExists.lastname) {
      return res.status(400).json({
        message:
          "User registration must be completed before pharmacy manager registration.",
      });
    }

    // Create a new pharmacy manager registration
    const newPharmacyManagerRegistration = new PharmacyManagerRegistration({
      userId,
      pmName,
      pharmaName,
      compliance,
      licensePM,
      businessR,
      experience,
    });

    await newPharmacyManagerRegistration.save();

    res.status(201).json({
      message: "Pharmacy Manager registration completed successfully.",
      pharmacyManagerRegistration: newPharmacyManagerRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { createPharmacyManager };

// Update an existing pharmacy manager's registration
const updatePharmacyManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { pmName, pharmaName, experience } = req.body;

    // Ensure document fields are updated if they exist
    const updateFields = {
      pmName,
      pharmaName,
      experience,
    };

    if (req.files) {
      updateFields.compliance = req.files["compliance"]
        ? req.files["compliance"][0].path
        : undefined;
      updateFields.licensePM = req.files["licensePM"]
        ? req.files["licensePM"][0].path
        : undefined;
      updateFields.businessR = req.files["businessR"]
        ? req.files["businessR"][0].path
        : undefined;
    }

    // Find and update the pharmacy manager registration
    const updatedPharmacyManager =
      await PharmacyManagerRegistration.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

    if (!updatedPharmacyManager) {
      return res
        .status(404)
        .json({ message: "Pharmacy Manager registration not found." });
    }

    res.status(200).json({
      message: "Pharmacy Manager registration updated successfully.",
      pharmacyManager: updatedPharmacyManager,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { updatePharmacyManager };

// Get a pharmacy manager registration by userId
const getPharmacyManagerRegistration = async (req, res) => {
  try {
    const { userId } = req.params;
    const pharmacyManagerRegistration =
      await PharmacyManagerRegistration.findOne({ userId });

    if (!pharmacyManagerRegistration) {
      return res
        .status(404)
        .json({ message: "Pharmacy Manager registration not found." });
    }

    res.status(200).json({ pharmacyManagerRegistration });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { getPharmacyManagerRegistration };

// Get all pharmacy manager registrations
const getAllPharmacyManagerRegistrations = async (req, res) => {
  try {
    const pharmacyManagerRegistrations =
      await PharmacyManagerRegistration.find();
    res.status(200).json({ pharmacyManagerRegistrations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { getAllPharmacyManagerRegistrations };

// Delete a pharmacy manager registration by userId
const deletePharmacyManagerRegistration = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete the pharmacy manager registration
    const pharmacyManagerRegistration =
      await PharmacyManagerRegistration.findOneAndDelete({ userId });

    if (!pharmacyManagerRegistration) {
      return res
        .status(404)
        .json({ message: "Pharmacy Manager registration not found." });
    }

    res
      .status(200)
      .json({ message: "Pharmacy Manager registration deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { deletePharmacyManagerRegistration };

// Get all users with pharmacy manager registration details
const getAllUsersWithPharmacyManagerDetails = async (req, res) => {
  try {
    // Fetch all users with the role 'pharmacyManager'
    const users = await User.find({ role: "pharmacyManager" });
    const userIds = users.map((user) => user._id);

    // Fetch all pharmacy manager registration details where userId matches
    const pharmacyManagerRegistrations = await PharmacyManagerRegistration.find(
      { userId: { $in: userIds } }
    );

    // Combine user data with their pharmacy manager registration details
    const usersWithPharmacyManagerDetails = users.map((user) => {
      const pharmacyManagerRegistration = pharmacyManagerRegistrations.find(
        (reg) => reg.userId.equals(user._id)
      );
      return { ...user.toObject(), pharmacyManagerRegistration };
    });

    // Send response
    res.status(200).json({ usersWithPharmacyManagerDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { getAllUsersWithPharmacyManagerDetails };
