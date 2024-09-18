const express = require("express");
const router = express.Router();
const { login } = require("../controller/loginController");
const authMiddleware = require("../Middelware/authMiddleware");

// Login route
router.post("/login", login);

{
  /*// Example protected route for Admin
router.get("/admin/dashboard", authMiddleware("admin"), (req, res) => {
  res.send("Admin Dashboard");
});

// Example protected route for Doctors
router.get("/doctor/dashboard", authMiddleware("doctor"), (req, res) => {
  res.send("Doctor Dashboard");
});
// Example protected route for PM
router.get(
  "/pharmacyManager/dashboard",
  authMiddleware("pharmacyManager"),
  (req, res) => {
    res.send("pharmacyManager Dashboard");
  }
);

// Example protected route for Pharmacists
router.get(
  "/pharmacist/dashboard",
  authMiddleware("pharmacist"),
  (req, res) => {
    res.send("Pharmacist Dashboard");
  }
);*/
}
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("role");
  res.json({ success: true, msg: "Logged out successfully" });
});

module.exports = router;
