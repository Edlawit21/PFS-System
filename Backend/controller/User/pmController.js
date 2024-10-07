const PharmacyManagerRegistration = require("../../Models/Userform/pmRegModel");
const User = require("../../Models/Userform/userModel");
const AddressRegistration = require("../../Models/Userform/addressModel");

// Create a new pharmacy manager's registration
const createPharmacyManager = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body

    // Destructure the basic info and professional details from the request body
    const {
      firstname,
      lastname,
      username,
      email,
      gender,
      phoneNumber,
      role,
      password,
      pmName,
      pharmaName,
      experience,
      state,
      city,
      contactNumber,
      operatingDays,
      servicesOffered,
      latitude,
      longitude,
    } = req.body;

    console.log("Basic info received:", {
      firstname,
      lastname,
      username,
      email,
      gender,
      phoneNumber,
      role,
    });

    console.log("body ", req.body);

    // Check if the email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists." });
    }
    // Ensure files are uploaded
    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        message:
          "All files (compliance, license, business registration) are required.",
      });
    }

    const compliance = req.files["compliance"]
      ? "Uploads/documents/" + req.files["compliance"][0].filename
      : null;
    const licensePM = req.files["licensePM"]
      ? "Uploads/documents/" + req.files["licensePM"][0].filename
      : null;
    const businessR = req.files["businessR"]
      ? "Uploads/documents/" + req.files["businessR"][0].filename
      : null;

    // Create a new user with the hashed password
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      gender,
      phoneNumber,
      role,
      password,
      status: "Pending", // Set the initial status to "Pending"
    });

    // Save the user first
    const savedUser = await newUser.save(); // Save the new user to the database
    console.log("User created and saved with ID:", savedUser._id);

    // Create a new pharmacy manager registration
    const newPharmacyManagerRegistration = new PharmacyManagerRegistration({
      userId: savedUser._id,
      pmName,
      pharmaName,
      compliance,
      licensePM,
      businessR,
      experience,
    });

    await newPharmacyManagerRegistration.save();

    const addressRegistration = new AddressRegistration({
      pharmacyManagerRegistrationId: newPharmacyManagerRegistration._id,
      state,
      city,
      contactNumber,
      operatingDays,
      servicesOffered,
      latitude,
      longitude,
    });
    await addressRegistration.save();

    res.status(201).json({
      message: "Pharmacy Manager registration completed successfully.",
      pharmacyManagerRegistration: newPharmacyManagerRegistration,
    });
  } catch (error) {
    console.error("Error creating pharmacy manager:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
        ? req.files["compliance"][0].filename
        : undefined;
      updateFields.licensePM = req.files["licensePM"]
        ? req.files["licensePM"][0].filename
        : undefined;
      updateFields.businessR = req.files["businessR"]
        ? req.files["businessR"][0].filename
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
module.exports = {
  createPharmacyManager,
  updatePharmacyManager,
  getPharmacyManagerRegistration,
  getAllPharmacyManagerRegistrations,
  deletePharmacyManagerRegistration,
  getAllUsersWithPharmacyManagerDetails,
};
