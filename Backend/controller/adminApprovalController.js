{
  /*const DoctorRegistration = require("../Models/Userform/doctorRegModel");
const PharmacyManagerRegistration = require("../Models/Userform/pmRegModel");
const User = require("../Models/Userform/userModel");
const nodemailer = require("nodemailer");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email notification
const sendNotificationEmail = async (email, status, role) => {
  const subject =
    status === "Approved" ? "Registration Approved" : "Registration Rejected";
  const text = `Dear ${role},\n\nYour registration has been ${status}. You can now ${
    status === "Approved" ? "access the system" : "not access the system"
  }.\n\nThank you.`;

  await transporter.sendMail({
    from: "edlawitbeyene21@gmail.com",
    to: email,
    subject,
    text,
  });
};

// Get all doctor registrations for review
const getAllDoctorRegistrations = async (req, res) => {
  try {
    // Fetch doctor registrations
    const doctors = await DoctorRegistration.find();

    // Fetch user details with only required fields
    const users = await User.find(
      { _id: { $in: userIds } },
      "email role username" // Select only the fields you need
    );

    // Combine user and registration details
    const doctorsWithUserDetails = doctors.map((doc) => {
      const user = users.find((u) => u._id.equals(doc.userId));
      return {
        ...doc.toObject(),
        user: {
          email: user.email,
          role: user.role,
          username: user.username,
        }, // Include selected user details
      }; // Merge doctor registration details with user info
    });

    res.status(200).json({ doctorsWithUserDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all pharmacy manager registrations for review
const getAllPharmacyManagerRegistrations = async (req, res) => {
  try {
    // Fetch pharmacy manager registrations
    const pharmacyManagers = await PharmacyManagerRegistration.find();

    // For each pharmacy manager, also get user information
    const userIds = pharmacyManagers.map((pm) => pm.userId);
    const users = await User.find(
      { _id: { $in: userIds } },
      "email role username" // Select only the fields you need
    );
    // Combine pharmacy manager registration details with selected user info
    const pharmacyManagersWithUserDetails = pharmacyManagers.map((pm) => {
      const user = users.find((u) => u._id.equals(pm.userId));
      return {
        ...pm.toObject(), // Include all pharmacy manager registration details
        user: {
          email: user.email,
          role: user.role,
          username: user.username,
        }, // Include selected user details
      };
    });

    res.status(200).json({ pharmacyManagersWithUserDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Approve or reject a doctor registration
const updateDoctorRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value. Must be 'Approved' or 'Rejected'.",
      });
    }

    // Update Doctor Registration
    const updatedRegistration = await DoctorRegistration.findByIdAndUpdate(
      id,
      {
        status,
        approvalDate: status === "Approved" ? new Date() : null,
      },
      { new: true }
    );

    if (!updatedRegistration) {
      return res
        .status(404)
        .json({ message: "Doctor Registration not found." });
    }

    const user = await User.findById(updatedRegistration.userId);
    if (user) {
      user.status = status === "Approved" ? "Active" : "Pending";
      await user.save();
      await sendNotificationEmail(user.email, status, "Doctor");
    }

    res.status(200).json({
      message: "Doctor Registration status updated successfully.",
      registration: updatedRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Approve or reject a pharmacy manager registration
const updatePharmacyManagerRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value. Must be 'Approved' or 'Rejected'.",
      });
    }

    // Update Pharmacy Manager Registration
    const updatedRegistration =
      await PharmacyManagerRegistration.findByIdAndUpdate(
        id,
        {
          status,
          approvalDate: status === "Approved" ? new Date() : null,
        },
        { new: true }
      );

    if (!updatedRegistration) {
      return res
        .status(404)
        .json({ message: "Pharmacy Manager Registration not found." });
    }

    // Find associated user and update status
    const user = await User.findById(updatedRegistration.userId);
    if (user) {
      user.status = status === "Approved" ? "Active" : "Pending";
      await user.save();
      await sendNotificationEmail(user.email, status, "Pharmacy Manager");
    }

    res.status(200).json({
      message: "Pharmacy Manager Registration status updated successfully.",
      registration: updatedRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  updateDoctorRegistrationStatus,
  getAllPharmacyManagerRegistrations,
  getAllDoctorRegistrations,
  updatePharmacyManagerRegistrationStatus,
};
*/
}
const DoctorRegistration = require("../Models/Userform/doctorRegModel");
const PharmacyManagerRegistration = require("../Models/Userform/pmRegModel");
const User = require("../Models/Userform/userModel");
const nodemailer = require("nodemailer");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "edlawitbeyene21@gmail.com",
    pass: "qfjk lraj xazp cjiq",
  },
});

// Function to send email notification
const sendNotificationEmail = async (email, status, role) => {
  const subject =
    status === "Approved" ? "Registration Approved" : "Registration Rejected";
  const text = `Dear ${role},\n\nYour registration has been ${status}. You can now ${
    status === "Approved" ? "access the system" : "not access the system"
  }.\n\nThank you.`;

  await transporter.sendMail({
    from: "edlawitbeyene21@gmail.com",
    to: email,
    subject,
    text,
  });
};

// Get all doctor registrations for review
const getAllDoctorRegistrations = async (req, res) => {
  try {
    // Fetch doctor registrations
    const doctors = await DoctorRegistration.find();

    // Collect userIds from doctor registrations
    const userIds = doctors.map((doc) => doc.userId);

    // Fetch user details with only required fields
    const users = await User.find(
      { _id: { $in: userIds } },
      "email gender username phoneNumber" // Select only the fields you need
    );

    // Combine user and registration details
    const doctorsWithUserDetails = doctors.map((doc) => {
      const user = users.find((u) => u._id.equals(doc.userId));
      return {
        ...doc.toObject(),
        user: user
          ? {
              email: user.email,
              gender: user.gender,
              username: user.username,
              phoneNumber: user.phoneNumber,
            }
          : null,
      }; // Merge doctor registration details with user info
    });

    res.status(200).json({ doctorsWithUserDetails });
  } catch (error) {
    console.error("Error fetching doctor registrations:", error); // Detailed logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all pharmacy manager registrations for review
const getAllPharmacyManagerRegistrations = async (req, res) => {
  try {
    // Fetch pharmacy manager registrations
    const pharmacyManagers = await PharmacyManagerRegistration.find();

    // Collect userIds from pharmacy manager registrations
    const userIds = pharmacyManagers.map((pm) => pm.userId);

    // Fetch user details with only required fields
    const users = await User.find(
      { _id: { $in: userIds } },
      "email gender phoneNumber username" // Select only the fields you need
    );

    // Combine pharmacy manager registration details with selected user info
    const pharmacyManagersWithUserDetails = pharmacyManagers.map((pm) => {
      const user = users.find((u) => u._id.equals(pm.userId));
      return {
        ...pm.toObject(), // Include all pharmacy manager registration details
        user: user
          ? {
              email: user.email,
              gender: user.gender,
              username: user.username,
              phoneNumber: user.phoneNumber,
            }
          : null,
      };
    });

    res.status(200).json({ pharmacyManagersWithUserDetails });
  } catch (error) {
    console.error("Error fetching pharmacy manager registrations:", error); // Detailed logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Approve or reject a doctor registration
const updateDoctorRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value. Must be 'Approved' or 'Rejected'.",
      });
    }

    // Update Doctor Registration
    const updatedRegistration = await DoctorRegistration.findByIdAndUpdate(
      id,
      {
        status,
        approvalDate: status === "Approved" ? new Date() : null,
      },
      { new: true }
    );

    if (!updatedRegistration) {
      return res
        .status(404)
        .json({ message: "Doctor Registration not found." });
    }

    const user = await User.findById(updatedRegistration.userId);
    if (user) {
      user.status = status === "Approved" ? "Active" : "Pending";
      await user.save();
      await sendNotificationEmail(user.email, status, "Doctor");
    }

    res.status(200).json({
      message: "Doctor Registration status updated successfully.",
      registration: updatedRegistration,
    });
  } catch (error) {
    console.error("Error updating doctor registration status:", error); // Detailed logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Approve or reject a pharmacy manager registration
const updatePharmacyManagerRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value. Must be 'Approved' or 'Rejected'.",
      });
    }

    // Update Pharmacy Manager Registration
    const updatedRegistration =
      await PharmacyManagerRegistration.findByIdAndUpdate(
        id,
        {
          status,
          approvalDate: status === "Approved" ? new Date() : null,
        },
        { new: true }
      );

    if (!updatedRegistration) {
      return res
        .status(404)
        .json({ message: "Pharmacy Manager Registration not found." });
    }

    // Find associated user and update status
    const user = await User.findById(updatedRegistration.userId);
    if (user) {
      user.status = status === "Approved" ? "Active" : "Pending";
      await user.save();
      await sendNotificationEmail(user.email, status, "Pharmacy Manager");
    }

    res.status(200).json({
      message: "Pharmacy Manager Registration status updated successfully.",
      registration: updatedRegistration,
    });
  } catch (error) {
    console.error(
      "Error updating pharmacy manager registration status:",
      error
    ); // Detailed logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  updateDoctorRegistrationStatus,
  getAllPharmacyManagerRegistrations,
  getAllDoctorRegistrations,
  updatePharmacyManagerRegistrationStatus,
};
