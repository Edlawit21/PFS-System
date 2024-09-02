const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  profileImage: { type: String, required: true }, // Store URL or path to the uploaded image
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  gender: { type: Number, enum: [1, 2], required: true }, // 1 for Male, 2 for Female
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ["doctor", "pharmacyManager"], required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
