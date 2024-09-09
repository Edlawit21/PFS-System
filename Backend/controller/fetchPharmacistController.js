{
  /*const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");

const fetchPharmacists = async (req, res) => {
  try {
    const { managerId } = req.user; // Pharmacy Manager ID from authentication

    // Find all pharmacists registered by this pharmacy manager
    const pharmacists = await Pharmacist.find({ manager: managerId });

    if (!pharmacists.length) {
      return res
        .status(404)
        .json({ message: "No pharmacists found for this manager" });
    }

    res
      .status(200)
      .json({ message: "Pharmacists fetched successfully", pharmacists });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pharmacists", error });
  }
};

module.exports = { fetchPharmacists };
//Pharmacist Listing: Fetches the list of pharmacists registered by a particular pharmacy manager*/
}
