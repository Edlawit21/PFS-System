const express = require("express");
const router = express.Router();
const {
  createPharmacist,
  updatePharmacist,
  getPharmacists,
  getPharmacistById,
  deletePharmacist,
} = require("../controller/User/pharmacistController");
const {
  createPharmacistValidator,
  updatePharmacistValidator,
  validate,
} = require("../Validation/pharmacistValidation");
const authMiddleware = require("../Middelware/authMiddleware");
const { documentUpload } = require("../Config/multer");

// Route to create a new pharmacist
router.post(
  "/create",
  authMiddleware("pharmacyManager"), // Ensure only pharmacy managers can create pharmacists
  documentUpload.fields([
    { name: "education", maxCount: 1 },
    { name: "idDocument", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
  ]),
  createPharmacistValidator,
  validate,
  createPharmacist
);

// Route to update an existing pharmacist
router.put(
  "/update/:id",
  authMiddleware("pharmacyManager"), // Ensure only pharmacy managers can update pharmacists
  documentUpload.fields([
    { name: "education", maxCount: 1 },
    { name: "idDocument", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
  ]),
  updatePharmacistValidator,
  validate,
  updatePharmacist
);

// Route to get all pharmacists
router.get("/all", authMiddleware("pharmacyManager", "admin"), getPharmacists);

// Route to get a specific pharmacist by ID
router.get("/:id", authMiddleware("pharmacyManager"), getPharmacistById);

// Route to delete a pharmacist by ID
router.delete("/:id", authMiddleware("pharmacyManager"), deletePharmacist);

module.exports = router;
