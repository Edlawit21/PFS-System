const DoctorRegistration = require("../Models/Userform/doctorRegModel");
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
    from: "your-email@gmail.com",
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

    // For each doctor, also get user information
    const userIds = doctors.map((doc) => doc.userId);
    const users = await User.find({ _id: { $in: userIds } });

    // Combine user and registration details
    const doctorsWithUserDetails = doctors.map((doc) => {
      const user = users.find((u) => u._id.equals(doc.userId));
      return { ...doc.toObject(), user }; // Merge doctor registration details with user info
    });

    res.status(200).json({ doctorsWithUserDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAllDoctorRegistrations };

// Get all pharmacy manager registrations for review
const getAllPharmacyManagerRegistrations = async (req, res) => {
  try {
    // Fetch pharmacy manager registrations
    const pharmacyManagers = await PharmacyManagerRegistration.find();

    // For each pharmacy manager, also get user information
    const userIds = pharmacyManagers.map((pm) => pm.userId);
    const users = await User.find({ _id: { $in: userIds } });

    // Combine user and registration details
    const pharmacyManagersWithUserDetails = pharmacyManagers.map((pm) => {
      const user = users.find((u) => u._id.equals(pm.userId));
      return { ...pm.toObject(), user }; // Merge pharmacy manager registration details with user info
    });

    res.status(200).json({ pharmacyManagersWithUserDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { getAllPharmacyManagerRegistrations };

// Approve or reject a doctor registration
const updateDoctorRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewerComments } = req.body;

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
        reviewerComments,
        approvalDate: status === "Approved" ? new Date() : null,
      },
      { new: true }
    );

    if (!updatedRegistration) {
      return res
        .status(404)
        .json({ message: "Doctor Registration not found." });
    }

    // Find associated user and update status
    const user = await User.findById(updatedRegistration.userId);
    if (user) {
      user.status = status === "Approved" ? "Active" : "Inactive";
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

module.exports = { updateDoctorRegistrationStatus };

// Approve or reject a pharmacy manager registration
const updatePharmacyManagerRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewerComments } = req.body;

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
          reviewerComments,
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
      user.status = status === "Approved" ? "Active" : "Inactive";
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

module.exports = { updatePharmacyManagerRegistrationStatus };
