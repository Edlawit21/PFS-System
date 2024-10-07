const PharmacyManagerRegistration = require("../../Models/Userform/pmRegModel");
const User = require("../../Models/Userform/userModel");
const AddressRegistration = require("../../Models/Userform/addressModel");
const Product = require("../../Models/PharmacyM/productModel");

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
// Update an existing pharmacy manager's registration
const updatePharmacyManager = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the route parameters

    // Destructure the necessary fields from the request body
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

    // Prepare the update fields object
    const updateUserFields = {
      firstname,
      lastname,
      username,
      email,
      gender,
      phoneNumber,
      role,
    };

    // Prepare the pharmacy manager specific fields
    const updateManagerFields = {
      pmName,
      pharmaName,
      experience,
    };

    // Check if files are uploaded and include them in the updateManagerFields
    if (req.files) {
      if (req.files["compliance"]) {
        updateManagerFields.compliance =
          "Uploads/documents/" + req.files["compliance"][0].filename;
      }
      if (req.files["licensePM"]) {
        updateManagerFields.licensePM =
          "Uploads/documents/" + req.files["licensePM"][0].filename;
      }
      if (req.files["businessR"]) {
        updateManagerFields.businessR =
          "Uploads/documents/" + req.files["businessR"][0].filename;
      }
    }

    // Find the pharmacy manager registration and update it
    const updatedPharmacyManager =
      await PharmacyManagerRegistration.findByIdAndUpdate(
        id,
        updateManagerFields,
        {
          new: true, // Return the updated document
          runValidators: true, // Validate the update operation
        }
      );

    if (!updatedPharmacyManager) {
      return res
        .status(404)
        .json({ message: "Pharmacy Manager registration not found." });
    }

    // Update the associated user details
    const updatedUser = await User.findByIdAndUpdate(
      updatedPharmacyManager.userId,
      updateUserFields,
      {
        new: true,
        runValidators: true,
      }
    );

    // If there's an address that needs to be updated, update it as well
    const updatedAddress = await AddressRegistration.findOneAndUpdate(
      { pharmacyManagerRegistrationId: id }, // Match by registration ID
      {
        state,
        city,
        contactNumber,
        operatingDays,
        servicesOffered,
        latitude,
        longitude,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Pharmacy Manager registration updated successfully.",
      pharmacyManager: updatedPharmacyManager,
      user: updatedUser,
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating pharmacy manager:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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

const getAllPharmacy = async (req, res) => {
  try {
    console.log("Incoming request for all pharmacy managers");

    // Find all pharmacy manager registrations and populate address and products
    const pharmacyManagerRegistrations =
      await PharmacyManagerRegistration.find()
        .populate({
          path: "address", // Reference the address from the Address model
          model: "Address", // Specify the model explicitly
        })
        .populate({
          path: "products", // Reference the products from the Product model
          model: "Product", // Specify the model explicitly
        });

    // Log the retrieved pharmacy manager registrations
    console.log(
      "Retrieved pharmacy manager registrations:",
      pharmacyManagerRegistrations
    );

    // Return the combined details
    res.status(200).json({ pharmacyManagerRegistrations });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching pharmacy managers:", error);
    res.status(500).json({ message: "get all pharmacy", error });
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
const fetchAllPharmacyManagers = async (req, res) => {
  try {
    console.log("Fetching all pharmacy managers...");
    // Fetch all pharmacy manager registrations and populate user details
    const pharmacyManagers = await PharmacyManagerRegistration.find().populate(
      "userId",
      "firstname lastname username email phoneNumber role"
    );

    // Fetch address registrations based on the pharmacy manager registration IDs
    const addressRegistrations = await AddressRegistration.find({
      pharmacyManagerRegistrationId: {
        $in: pharmacyManagers.map((pm) => pm._id),
      },
    });

    // Create a mapping of address registrations for easy lookup
    const addressMap = addressRegistrations.reduce((acc, address) => {
      acc[address.pharmacyManagerRegistrationId] = address;
      return acc;
    }, {});

    // Combine pharmacy manager details with address details
    const results = pharmacyManagers.map((pm) => ({
      ...pm.toObject(), // Convert Mongoose document to a plain object
      addressDetails: addressMap[pm._id] || null, // Attach address details
    }));

    // Check if any pharmacy managers are found
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No pharmacy managers found." });
    }

    console.log("Fetched Pharmacy Managers:", results);

    // Structure the response to include user, pharmacy manager, and address details
    const formattedResponse = results.map((pm) => ({
      user: pm.userId,
      pmName: pm.pmName,
      pharmaName: pm.pharmaName,
      experience: pm.experience,
      addressDetails: pm.addressDetails
        ? {
            state: pm.addressDetails.state,
            city: pm.addressDetails.city,
            contactNumber: pm.addressDetails.contactNumber,
            operatingDays: pm.addressDetails.operatingDays,
            servicesOffered: pm.addressDetails.servicesOffered,
            latitude: pm.addressDetails.latitude,
            longitude: pm.addressDetails.longitude,
          }
        : null,
      compliance: pm.compliance,
      licensePM: pm.licensePM,
      businessR: pm.businessR,
    }));

    // Send the response
    res.status(200).json({
      message: "Pharmacy managers fetched successfully.",
      pharmacyManagers: formattedResponse,
    });
  } catch (error) {
    console.error("Error fetching pharmacy managers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all pharmacy managers along with their addresses

module.exports = {
  createPharmacyManager,
  updatePharmacyManager,
  getPharmacyManagerRegistration,
  getAllPharmacyManagerRegistrations,
  deletePharmacyManagerRegistration,
  getAllPharmacy,
  fetchAllPharmacyManagers,
};
