const express = require("express");
const generateReport = require("../services/generateReport"); // Path to your report generation function

const router = express.Router();

// Route to get sales report
router.get("/report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required" });
    }

    const reportData = await generateReport(startDate, endDate);
    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).json({ message: "Error generating report", error });
  }
});

module.exports = router;
