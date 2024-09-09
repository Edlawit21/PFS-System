const express = require("express");
const router = express.Router();
const { documentUpload } = require("../Config/multer");
const {
  createDoctor,
  updateDoctor,
  getDoctorRegistration,
  getAllDoctorRegistrations,
  deleteDoctorRegistration,
  getAllUsersWithDoctorDetails,
} = require("../controller/User/docRegController");
const {
  createDoctorValidator,
  updateDoctorValidator,
  validate,
} = require("../Validation/docValidation");
const authMiddleware = require("../Middelware/authMiddleware");

router.post(
  "/",

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
router.put(
  "/:id",
  documentUpload.fields([
    { name: "educationalInfo", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "medicalLicense", maxCount: 1 },
  ]),
  updateDoctorValidator,
  validate,
  updateDoctor
);

// Route to get a doctor's registration details by userId
router.get("/user/:userId", authMiddleware("doctor"), getDoctorRegistration);

// Route to get all doctor registrations with pagination
router.get("/", authMiddleware("admin"), getAllDoctorRegistrations);

// Route to delete a doctor's registration by userId
router.delete(
  "/user/:userId",
  authMiddleware("admin"),
  deleteDoctorRegistration
);

// Route to get all users with doctor registration details
router.get(
  "/users-with-details",
  authMiddleware("admin"),
  getAllUsersWithDoctorDetails
);

module.exports = router;
