const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  profileImage: { type: String, required: true }, // Store URL or path to the uploaded image
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  gender: { type: String, enum: ["male", "female"], required: true }, // 1 for Male, 2 for Female
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ["doctor", "pharmacyManager"], required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Active", "Inactive"],
    default: "Pending",
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Method to compare hashed password with provided password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;

{
  /* passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },*/
}
