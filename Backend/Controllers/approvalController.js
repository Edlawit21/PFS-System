// adminApprovalController.js
const DoctorRegistration = require("../models/DoctorRegistration");
const PharmacyManagerRegistration = require("../models/PharmacyManagerRegistration");
const Doctor = require("../models/Doctor");
const PharmacyManager = require("../models/PharmacyManager");
const User = require("../models/User");
const { sendEmail } = require("../helpers/emailHelper");

// Approve or reject a registration
const approveRegistration = async (req, res) => {
  const { registrationId, role, status, reviewerComments } = req.body;

  try {
    let registration;
    let user;

    if (role === "doctor") {
      registration = await DoctorRegistration.findById(registrationId).populate(
        "userId"
      );
      if (!registration)
        return res
          .status(404)
          .json({ message: "Doctor registration not found" });

      // Create a Doctor document and delete the registration
      const doctor = new Doctor({
        userId: registration.userId._id,
        docName: registration.docName,
        educationalInfo: registration.educationalInfo,
        hospitalName: registration.hospitalName,
        hospitalType: registration.hospitalType,
        specialization: registration.specialization,
        certificate: registration.certificate,
        experience: registration.experience,
        medicalLicense: registration.medicalLicense,
        active: true,
      });

      await doctor.save();
      await DoctorRegistration.findByIdAndDelete(registrationId);

      user = registration.userId;
    } else if (role === "pharmacyManager") {
      registration = await PharmacyManagerRegistration.findById(
        registrationId
      ).populate("userId");
      if (!registration)
        return res
          .status(404)
          .json({ message: "Pharmacy Manager registration not found" });

      // Create a Pharmacy Manager document and delete the registration
      const pharmacyManager = new PharmacyManager({
        userId: registration.userId._id,
        pmName: registration.pmName,
        pharmaName: registration.pharmaName,
        licensePM: registration.licensePM,
        businessR: registration.businessR,
        compliance: registration.compliance,
        experience: registration.experience,
        active: true,
      });

      await pharmacyManager.save();
      await PharmacyManagerRegistration.findByIdAndDelete(registrationId);

      user = registration.userId;
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    // Prepare email content based on approval status
    let subject, text;
    if (status === "Approved") {
      subject = "Registration Approved";
      text = `Dear ${user.firstname},\n\nYour registration as a ${role} has been approved. You can now access the system.\n\nBest regards,\nThe Team`;
    } else if (status === "Rejected") {
      subject = "Registration Rejected";
      text = `Dear ${user.firstname},\n\nWe regret to inform you that your registration as a ${role} has been rejected.\n\nReason: ${reviewerComments}\n\nBest regards,\nThe Team`;
    }

    // Send the email
    await sendEmail(user.email, subject, text);

    res
      .status(200)
      .json({ message: `Registration ${status.toLowerCase()} successfully` });
  } catch (error) {
    console.error("Error approving registration:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { approveRegistration };
