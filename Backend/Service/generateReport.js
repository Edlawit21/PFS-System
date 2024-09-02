const SalesTransaction = require("../Models/Pharmacist/salesModel"); // Path to your SalesTransaction model

// Function to generate a sales report
const generateReport = async (startDate, endDate) => {
  try {
    // Ensure the dates are in the correct format
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Query the database for sales within the specified date range
    const salesData = await SalesTransaction.find({
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 }); // Sort by date, descending

    return salesData;
  } catch (error) {
    throw new Error("Error generating report: " + error.message);
  }
};

module.exports = generateReport;
