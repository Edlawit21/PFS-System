const DoctorRegistration = require("../../Models/Userform/doctorRegModel");
const User = require("../../Models/Userform/userModel");

const createDoctor = async (req, res) => {
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

      docName,
      hospitalName,
      hospitalType,
      specialization,
      experience,
      pin,
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

    // Check if the email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists." });
    }

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

    // Now handle the doctor registration details
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({
        message: "Educational Info and Medical License are required.",
      });
    }

    const educationalInfo = req.files["educationalInfo"]
      ? "Uploads/documents" + req.files["educationalInfo"][0].filename
      : null;
    const certificate = req.files["certificate"]
      ? "Uploads/documents" + req.files["certificate"][0].file
      : null; // Optional
    const medicalLicense = req.files["medicalLicense"]
      ? "Uploads/documents" + req.files["medicalLicense"][0].file
      : null;

    // Create a new doctor registration with the saved user's _id (userId)
    const newDoctorRegistration = new DoctorRegistration({
      userId: savedUser._id, // Use the newly created user's _id
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

    // Save the doctor registration
    await newDoctorRegistration.save();

    res.status(201).json({
      message: "Doctor registration completed successfully.",
      doctorRegistration: newDoctorRegistration,
    });
  } catch (error) {
    console.error("Error in createDoctor:", error); // Log the error details
    res.status(500).json({ message: "Server error", error });
  }
};

//Update
const updateDoctor = async (req, res) => {
  try {
    const { userId } = req.params;

    // Destructure the basic user info from the request body
    const {
      firstname,
      lastname,
      username,
      email,
      gender,
      phoneNumber,
      password, // Optional, only if the password needs to be updated
      role,
      docName,
      hospitalName,
      hospitalType,
      specialization,
      experience,
      pin,
    } = req.body;

    // Create an object for the user fields to update if they are provided
    const userUpdateFields = {};

    if (firstname) userUpdateFields.firstname = firstname;
    if (lastname) userUpdateFields.lastname = lastname;
    if (username) userUpdateFields.username = username;
    if (email) userUpdateFields.email = email;
    if (gender) userUpdateFields.gender = gender;
    if (phoneNumber) userUpdateFields.phoneNumber = phoneNumber;
    if (role) userUpdateFields.role = role;
    if (password) userUpdateFields.password = password; // Ensure password is hashed if updated

    // Update the User model first
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: userUpdateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Now handle doctor-specific fields
    const doctorUpdateFields = {};

    if (docName) doctorUpdateFields.docName = docName;
    if (hospitalName) doctorUpdateFields.hospitalName = hospitalName;
    if (hospitalType) doctorUpdateFields.hospitalType = hospitalType;
    if (specialization) doctorUpdateFields.specialization = specialization;
    if (experience) doctorUpdateFields.experience = experience;
    if (pin) doctorUpdateFields.pin = pin;

    // Update the DoctorRegistration model
    const updatedDoctor = await DoctorRegistration.findOneAndUpdate(
      { userId },
      { $set: doctorUpdateFields },
      { new: true }
    );

    if (!updatedDoctor) {
      return res
        .status(404)
        .json({ message: "Doctor registration not found." });
    }

    res.status(200).json({
      message: "Doctor and user information updated successfully.",
      user: updatedUser,
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor and user information:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a doctor's registration details by userId
const getDoctorRegistration = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the doctor registration using the userId
    const doctorRegistration = await DoctorRegistration.findOne({ userId });

    if (!doctorRegistration) {
      return res
        .status(404)
        .json({ message: "Doctor registration not found." });
    }

    // Fetch the user information associated with the doctor
    const userInfo = await User.findById(userId);

    if (!userInfo) {
      return res.status(404).json({ message: "User not found." });
    }

    // Combine both user info and doctor registration details
    res.status(200).json({
      userInfo,
      doctorRegistration,
    });
  } catch (error) {
    console.error("Error fetching doctor profile:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a doctor's registration details by userId and include user info
const getAllDoctorRegistration = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the doctor registration using the userId
    const doctorRegistration = await DoctorRegistration.findOne({ userId });

    if (!doctorRegistration) {
      return res
        .status(404)
        .json({ message: "Doctor registration not found." });
    }

    // Fetch the user information associated with the doctor
    const userInfo = await User.findById(userId);

    if (!userInfo) {
      return res.status(404).json({ message: "User not found." });
    }

    // Combine both user info and doctor registration details
    res.status(200).json({
      userInfo,
      doctorRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a doctor's registration by userId
const deleteDoctorRegistration = async (req, res) => {
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

module.exports = {
  createDoctor,
  updateDoctor,
  getDoctorRegistration,
  getAllDoctorRegistration,
  deleteDoctorRegistration,
};
