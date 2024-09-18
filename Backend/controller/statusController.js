{
  /*const DoctorRegistration = require("../Models/Userform/doctorRegModel");
const PharmacyManagerRegistration = require("../Models/Userform/pmRegModel");
const User = require("../Models/Userform/userModel");

// Fetch combined user and role-specific details (doctor or pharmacy manager)
const getUserAndRoleDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let roleDetails = {};

    // Check the role of the user (doctor or pharmacy manager)
    if (user.role === "doctor") {
      // Fetch doctor registration details
      const doctorDetails = await DoctorRegistration.findOne({ userId });
      if (!doctorDetails) {
        return res.status(404).json({ message: "Doctor details not found" });
      }

      roleDetails = {
        doctorName: doctorDetails.doctorName,
        specialization: doctorDetails.specialization,
        hospitalName: doctorDetails.hospitalName,
      };
    } else if (user.role === "pmanager") {
      // Fetch pharmacy manager registration details
      const pmDetails = await PharmacyManagerRegistration.findOne({ userId });
      if (!pmDetails) {
        return res
          .status(404)
          .json({ message: "Pharmacy manager details not found" });
      }

      roleDetails = {
        pmName: pmDetails.pmName,
        pharmacyName: pmDetails.pharmacyName,
        licenseNumber: pmDetails.licenseNumber,
      };
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Combine user and role-specific details
    const combinedDetails = {
      email: user.email,
      username: user.username,
      role: user.role,
      status: user.status, // Active or Inactive
      ...roleDetails, // Spreads doctor or pm details
    };

    res.status(200).json(combinedDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Toggle user activation (activate/deactivate) for both doctor and pharmacy manager
const toggleUserActivation = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the status
    user.status = user.status === "Active" ? "Inactive" : "Active";

    // Save the updated status
    await user.save();

    res.status(200).json({
      message: `User has been ${
        user.status === "Active" ? "activated" : "deactivated"
      }`,
      status: user.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getUserAndRoleDetails,
  toggleUserActivation,
};
*/
}
const DoctorRegistration = require("../Models/Userform/doctorRegModel");
const PharmacyManagerRegistration = require("../Models/Userform/pmRegModel");
const User = require("../Models/Userform/userModel");

// Fetch all users with their statuses (both active and inactive)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch combined user and role-specific details (doctor or pharmacy manager)
const getUserAndRoleDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let roleDetails = {};

    // Check the role of the user (doctor or pharmacy manager)
    if (user.role === "doctor") {
      // Fetch doctor registration details
      const doctorDetails = await DoctorRegistration.findOne({ userId });
      if (!doctorDetails) {
        return res.status(404).json({ message: "Doctor details not found" });
      }

      roleDetails = {
        doctorName: doctorDetails.doctorName,
        specialization: doctorDetails.specialization,
        hospitalName: doctorDetails.hospitalName,
      };
    } else if (user.role === "pharmacyManager") {
      // Corrected role name
      // Fetch pharmacy manager registration details
      const pmDetails = await PharmacyManagerRegistration.findOne({ userId });
      if (!pmDetails) {
        return res
          .status(404)
          .json({ message: "Pharmacy manager details not found" });
      }

      roleDetails = {
        pmName: pmDetails.pmName,
        pharmacyName: pmDetails.pharmacyName,
        licenseNumber: pmDetails.licenseNumber,
      };
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Combine user and role-specific details
    const combinedDetails = {
      email: user.email,
      username: user.username,
      role: user.role,
      status: user.status, // Active or Inactive
      ...roleDetails, // Spreads doctor or pm details
    };

    res.status(200).json(combinedDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Toggle user activation (activate/deactivate) for both doctor and pharmacy manager
const toggleUserActivation = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the status
    user.status = user.status === "Active" ? "Inactive" : "Active";

    // Save the updated status
    await user.save();

    res.status(200).json({
      message: `User has been ${
        user.status === "Active" ? "activated" : "deactivated"
      }`,
      status: user.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch users by their status (active or inactive)
const getUsersByStatus = async (req, res) => {
  try {
    const { status } = req.params; // Status can be "Active" or "Inactive"

    // Validate status
    if (status !== "Active" && status !== "Inactive") {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Fetch users by status
    const users = await User.find({ status });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getAllUsers,
  getUserAndRoleDetails,
  toggleUserActivation,
  getUsersByStatus,
};
