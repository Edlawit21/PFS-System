const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const registerPharmacistSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensure unique usernames
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
    },
    residentialAddress: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    idDocument: {
      type: String,
      required: true,
    },
    graduationDate: {
      type: Date,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    licenseExpiryDate: {
      type: Date,
      required: true,
    },
    experience: {
      type: String,
    },
    passportPhoto: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PharmacyManager",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

registerPharmacistSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});

// Method to compare hashed password with provided password
registerPharmacistSchema.methods.comparePassword = async function (
  candidatePassword
) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const Pharmacist = mongoose.model("Pharmacist", registerPharmacistSchema);

module.exports = Pharmacist;
