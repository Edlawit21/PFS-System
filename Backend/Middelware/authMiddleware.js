const jwt = require("jsonwebtoken");
const User = require("../Models/Userform/userModel");
const Admin = require("../Models/Userform/adminModel");
const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");

// Middleware to check authentication and authorization
const authMiddleware =
  (...allowedRoles) =>
  async (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Determine which model to use based on the role
      const role = decoded.role; // Ensure the role is included in the JWT payload

      // Get the user based on role
      let user;
      switch (role) {
        case "admin":
          user = await Admin.findById(decoded.id);
          break;
        case "doctor":
        case "pharmacyManager":
          user = await User.findById(decoded.id);
          break;
        case "pharmacist":
          user = await Pharmacist.findById(decoded.id).populate(
            "pharmacyManager"
          );
          break;
        default:
          return res.status(403).json({ msg: "Access denied" });
      }

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Check if the user's role is in the list of allowed roles
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      // Attach user to the request object
      req.user = user;
      next();
    } catch (err) {
      console.error("Token verification error:", err); // Log the detailed error
      res.status(401).json({ msg: "Token is not valid", error: err.message });
    }
  };

module.exports = authMiddleware;
