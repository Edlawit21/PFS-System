const SalesTransaction = require("../Models/Pharmacist/salesModel");
const SalesReport = require("../Models/Pharmacist/salesReportModel");
const { getPharmacistsUnderManager } = require("./User/pharmacistController");
const jwt = require("jsonwebtoken");
const Pharmacist = require("../Models/PharmacyM/pharmacistRegModel");

const generateSalesReport = async (req, res) => {
  try {
    const { date } = req.body;

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

    // Fetch sales transactions for the given date
    const transactions = await SalesTransaction.find({
      pharmacist: decoded.id,
      date: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lte: new Date(date).setHours(23, 59, 59, 999),
      },
    });

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
      transactions: transactions.map((tx) => tx._id),
      totalSales,
    });

    await report.save();

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure dates are provided
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required." });
    }

    // Extract role and userId from decoded token
    const { role, id: userId } = decoded;

    if (role === "pharmacist") {
      // Fetch reports for the specific pharmacist
      const reports = await SalesReport.find({
        pharmacist: userId,
        reportDate: {
          $gte: new Date(startDate).setHours(0, 0, 0, 0),
          $lte: new Date(endDate).setHours(23, 59, 59, 999),
        },
      }).populate({
        path: "transactions",
        select: "medicineName quantity totalPrice date", // Include fields to populate
      });

      if (!reports.length) {
        return res
          .status(404)
          .json({ message: "No reports found for this date range." });
      }

      res.status(200).json({ reports });
    } else if (role === "pharmacyManager") {
      // Get pharmacist IDs under the manager
      const pharmacistIds = await getPharmacistsUnderManager(userId);

      // Fetch reports for these pharmacists
      const reports = await SalesReport.find({
        pharmacist: { $in: pharmacistIds },
        reportDate: {
          $gte: new Date(startDate).setHours(0, 0, 0, 0),
          $lte: new Date(endDate).setHours(23, 59, 59, 999),
        },
      })
        .populate({
          path: "transactions",
          select: "medicineName quantity totalPrice date", // Include fields to populate
        })
        .populate({
          path: "pharmacist",
          select: "username", // Populate pharmacist's username
        });

      if (!reports.length) {
        return res
          .status(404)
          .json({ message: "No reports found for this date range." });
      }

      res.status(200).json({ reports });
    } else {
      res.status(403).json({ message: "Unauthorized access." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateSalesReport, getSalesReport };
