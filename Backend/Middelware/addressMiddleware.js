const AddressRegistration = require("../Models/Userform/addressModel");

// Middleware to check address ownership
const checkAddressOwnership = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const addressRegistration = await AddressRegistration.findOne({
      _id: addressId,
      pharmacyManagerRegistrationId: req.user._id,
    });

    if (!addressRegistration) {
      return res
        .status(404)
        .json({ message: "Address not found or access denied." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = checkAddressOwnership;
