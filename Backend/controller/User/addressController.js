const User = require("../../Models/Userform/userModel");
const AddressRegistration = require("../../Models/Userform/addressModel");
const PharmacyManagerRegistration = require("../../Models/Userform/pmRegModel");

// Create Address Registration
const createAddress = async (req, res) => {
  try {
    const {
      state,
      city,
      contactNumber,
      branches,
      operatingDays,
      servicesOffered,
    } = req.body;

    // Ensure the authenticated user is a pharmacy manager
    const { user } = req;
    if (user.role !== "pharmacyManager") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if the pharmacy manager registration exists
    const pharmacyManagerRegistration =
      await PharmacyManagerRegistration.findById(user._id);
    if (!pharmacyManagerRegistration) {
      return res
        .status(404)
        .json({ message: "Pharmacy Manager registration not found." });
    }

    // Ensure the pharmacy manager registration is complete before proceeding
    if (
      !pharmacyManagerRegistration.pmName ||
      !pharmacyManagerRegistration.pharmaName
    ) {
      return res.status(400).json({
        message:
          "Pharmacy Manager registration must be completed before adding address.",
      });
    }

    // Create the address registration
    const addressRegistration = new AddressRegistration({
      pharmacyManagerRegistrationId: pharmacyManagerRegistration._id,
      state,
      city,
      contactNumber,
      branches,
      operatingDays,
      servicesOffered,
    });
    await addressRegistration.save();

    res.status(201).json({
      message: "Address registration created successfully.",
      addressRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createAddress };

// Update Address Registration
const updateAddress = async (req, res) => {
  try {
    const {
      state,
      city,
      contactNumber,
      branches,
      operatingDays,
      servicesOffered,
    } = req.body;

    // Ensure the authenticated user is a pharmacy manager
    const { user } = req;
    if (user.role !== "pharmacyManager") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find the address registration by ID and check ownership
    const addressRegistration = await AddressRegistration.findOne({
      _id: req.params.addressId,
      pharmacyManagerRegistrationId: user._id,
    });

    if (!addressRegistration) {
      return res
        .status(404)
        .json({ message: "Address registration not found or access denied." });
    }

    // Update the address registration
    addressRegistration.state = state;
    addressRegistration.city = city;
    addressRegistration.contactNumber = contactNumber;
    addressRegistration.branches = branches;
    addressRegistration.operatingDays = operatingDays;
    addressRegistration.servicesOffered = servicesOffered;

    await addressRegistration.save();

    res.status(200).json({
      message: "Address registration updated successfully.",
      addressRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { updateAddress };

// Get Address Registration by ID
const getAddressRegistration = async (req, res) => {
  try {
    const addressRegistration = await AddressRegistration.findOne({
      _id: req.params.addressId,
      pharmacyManagerRegistrationId: req.user._id,
    });

    if (!addressRegistration) {
      return res
        .status(404)
        .json({ message: "Address registration not found or access denied." });
    }

    res.status(200).json({ addressRegistration });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAddressRegistration };

// Get All Address Registrations for the authenticated pharmacy manager
const getAllAddressRegistrations = async (req, res) => {
  try {
    const addressRegistrations = await AddressRegistration.find({
      pharmacyManagerRegistrationId: req.user._id,
    });

    res.status(200).json({ addressRegistrations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { getAllAddressRegistrations };

// Delete Address Registration
const deleteAddressRegistration = async (req, res) => {
  try {
    const addressRegistration = await AddressRegistration.findOneAndDelete({
      _id: req.params.addressId,
      pharmacyManagerRegistrationId: req.user._id,
    });

    if (!addressRegistration) {
      return res
        .status(404)
        .json({ message: "Address registration not found or access denied." });
    }

    res
      .status(200)
      .json({ message: "Address registration deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { deleteAddressRegistration };

// Get All Users with Pharmacy Manager and Address Details
const getAllUsersWithPharmacyManagerAndAddressDetails = async (req, res) => {
  try {
    const users = await User.find({ role: "pharmacyManager" });
    const userIds = users.map((user) => user._id);

    const pharmacyManagerRegistrations = await PharmacyManagerRegistration.find(
      { userId: { $in: userIds } }
    );
    const addressRegistrations = await AddressRegistration.find({
      pharmacyManagerRegistrationId: {
        $in: pharmacyManagerRegistrations.map((reg) => reg._id),
      },
    });

    const usersWithPharmacyManagerAndAddressDetails = users.map((user) => {
      const pharmacyManagerRegistration = pharmacyManagerRegistrations.find(
        (reg) => reg.userId.equals(user._id)
      );
      const addressRegistration = addressRegistrations.find((addr) =>
        addr.pharmacyManagerRegistrationId.equals(
          pharmacyManagerRegistration._id
        )
      );

      return {
        ...user.toObject(),
        pharmacyManagerRegistration,
        addressRegistration,
      };
    });

    res.status(200).json({ usersWithPharmacyManagerAndAddressDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAllUsersWithPharmacyManagerAndAddressDetails };
