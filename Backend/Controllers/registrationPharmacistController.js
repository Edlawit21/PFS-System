const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Pharmacist = require("../../Models/PharmacyM/pharmacistRegModel");

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
{
  /*
// Registration for Admin
exports.registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ msg: 'Admin with this username already exists.' });
    }

    const hashedPassword = await hashPassword(password);

    const admin = new Admin({
      username,
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    res.status(201).json({ msg: 'Admin registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/
}

// Registration for Pharmacist (by Pharmacy Manager)
exports.registerPharmacist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password, email, ...otherFields } = req.body;

    const existingPharmacist = await Pharmacist.findOne({ username });
    if (existingPharmacist) {
      return res
        .status(400)
        .json({ msg: "Pharmacist with this username already exists." });
    }
    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await hashPassword(password);

    const pharmacist = new Pharmacist({
      username,
      email,
      password: hashedPassword,
      ...otherFields,
      role: "pharmacist", // Role is implied by being in the Pharmacist collection
    });

    await pharmacist.save();
    res.status(201).json({ msg: "Pharmacist registered successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
