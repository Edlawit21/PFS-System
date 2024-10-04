const SalesTransaction = require("../Models/Pharmacist/salesModel");
const SalesReport = require("../Models/Pharmacist/salesReportModel");
const { getPharmacistsUnderManager } = require("./User/pharmacistController");
const jwt = require("jsonwebtoken");
const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");

const generateSalesReport = async (req, res) => {
  try {
    const { date } = req.body;
    console.log("Generating sales report for date:", date);

    // Extract pharmacistId from the authenticated user
    const pharmacistId = req.user._id; // or however you store the user's ID
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the pharmacist exists
    const pharmacist = await Pharmacist.findById(pharmacistId);
    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }
    console.log(">>>>>>>>Pharmacies>>>>>>", pharmacist);

    // Fetch sales transactions for the given date
    const transactions = await SalesTransaction.find({
      pharmacist: decoded.id,
      date: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lte: new Date(date).setHours(23, 59, 59, 999),
      },
    });
    console.log(">>>>>>Transactions >>>>>>", transactions);

    if (!transactions.length) {
      return res
        .status(404)
        .json({ message: "No transactions found for this date" });
    }

    // Calculate total sales for the day
    const totalSales = transactions.reduce(
      (total, transaction) => total + transaction.totalPrice,
      0
    );

    // Generate and save the report
    const report = new SalesReport({
      pharmacist: decoded.id,
      reportDate: date,
      transactions: transactions,
      totalSales,
    });

    await report.save();
    console.log("?>>>Report>>>>", report.transactions);

    // Fetch detailed transaction information for the report
    const detailedTransactions = await SalesTransaction.find({
      _id: { $in: transactions.map((tx) => tx._id) },
    });

    // Add detailed transaction information to the report
    const reportWithDetails = {
      ...report.toObject(), // Convert report to a plain JavaScript object
      transactions: detailedTransactions, // Include detailed transactions
    };

    res
      .status(201)
      .json({ message: "Sales report generated", report: reportWithDetails });
  } catch (error) {
    console.error("Error generating report:", error); // Log the full error
    res
      .status(500)
      .json({ message: "Error generating report", error: error.message });
  }
};

//Fetch Sales: Queries the SalesTransaction model for transactions made by the pharmacist on the specified date.
//Report Creation: Compiles the transactions into a report and calculates the total sales.

const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token is not valid." });
    }

    // Ensure dates are provided
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required." });
    }

    console.log("Start Date:", startDate, "End Date:", endDate);

    // Extract role and userId from decoded token
    const { role, id: userId } = decoded;

    let reports;
    if (role === "pharmacist") {
      reports = await SalesReport.find({
        pharmacist: userId,
        reportDate: {
          $gte: new Date(startDate).setHours(0, 0, 0, 0),
          $lte: new Date(endDate).setHours(23, 59, 59, 999),
        },
      }).populate({
        path: "transactions",
        select: "medicineName quantity totalPrice date",
      });
    } else if (role === "pharmacyManager") {
      const pharmacistIds = await getPharmacistsUnderManager(userId);
      reports = await SalesReport.find({
        pharmacist: { $in: pharmacistIds },
        reportDate: {
          $gte: new Date(startDate).setHours(0, 0, 0, 0),
          $lte: new Date(endDate).setHours(23, 59, 59, 999),
        },
      })
        .populate({
          path: "transactions",
          select: "medicineName quantity totalPrice date",
        })
        .populate({
          path: "pharmacist",
          select: "username",
        });
    } else {
      return res.status(403).json({ message: "Unauthorized access." });
    }

    if (!reports || reports.length === 0) {
      return res
        .status(404)
        .json({ message: "No reports found for this date range." });
    }

    res.status(200).json({ reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateSalesReport, getSalesReport };
