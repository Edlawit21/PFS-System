const express = require("express");
const router = express.Router();
const { documentUpload } = require("../Config/multer");
const {
  createDoctor,
  updateDoctor,
  getDoctorRegistration,
  getAllDoctorRegistration,
  deleteDoctorRegistration,
} = require("../controller/User/docRegController");
const {
  createDoctorValidator,
  updateDoctorValidator,
  validate,
} = require("../Validation/docValidation");
const authMiddleware = require("../Middelware/authMiddleware");

// Route to create a new doctor registration
router.post(
  "/register",
  documentUpload.fields([
    { name: "educationalInfo", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "medicalLicense", maxCount: 1 },
  ]),
  createDoctorValidator,
  validate,
  createDoctor
);

// Route to update an existing doctor's registration
router.put("/update", authMiddleware("doctor", "admin"), updateDoctor);

// Route to get a doctor's registration details by userId
router.get(
  "/:userId",
  authMiddleware("admin", "doctor"),
  getDoctorRegistration
);

// Route to get all doctor registrations with pagination
router.get("/", authMiddleware("admin", "doctor"), getAllDoctorRegistration);

// Route to delete a doctor's registration by userId
router.delete(
  "/delete/:userId",
  authMiddleware("admin"),
  deleteDoctorRegistration
);

module.exports = router;
