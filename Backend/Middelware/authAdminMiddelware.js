const authAdminMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    req.user = admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

//it is used like this in the middelware for the one handeled by the admin only like for approval or rejection

{
  /*const express = require('express');
const router = express.Router();
const { updateDoctorRegistrationStatus, updatePharmacyManagerRegistrationStatus } = require('./controller');
const authAdminMiddleware = require('./middleware/authAdminMiddleware');

router.put('/doctor/registration/:id', authAdminMiddleware, updateDoctorRegistrationStatus);
router.put('/pharmacyManager/registration/:id', authAdminMiddleware, updatePharmacyManagerRegistrationStatus);

module.exports = router;
 */
}
