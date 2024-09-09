{
  /*const SalesReport = require("../Models/Pharmacist/salesReportModel");
const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");

const fetchSalesReports = async (req, res) => {
  try {
    const { managerId } = req.user; // Pharmacy Manager ID from authentication
    const { pharmacistId, date } = req.body;

    // Ensure the pharmacist is managed by this manager
    const pharmacist = await Pharmacist.findOne({
      _id: pharmacistId,
      manager: managerId,
    });
    if (!pharmacist) {
      return res
        .status(403)
        .json({ message: "Access denied: You don't manage this pharmacist" });
    }

    // Fetch sales reports for the specified date
    const reports = await SalesReport.find({
      pharmacist: pharmacistId,
      reportDate: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lte: new Date(date).setHours(23, 59, 59, 999),
      },
    }).populate("transactions pharmacist");

    if (!reports.length) {
      return res
        .status(404)
        .json({ message: "No reports found for this date" });
    }

    res.status(200).json({ message: "Sales reports fetched", reports });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

module.exports = { fetchSalesReports };
//Manager Verification: Ensures the manager can only view reports from pharmacists they manage.
//Report Fetching: Retrieves reports based on the pharmacist ID and date.*/
}
