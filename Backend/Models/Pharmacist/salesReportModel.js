const mongoose = require("mongoose");

const salesReportSchema = new mongoose.Schema({
  reportDate: { type: Date, default: Date.now },
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    required: true,
  }, // Pharmacist generating the report
  transactions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "SalesTransaction" },
  ], // All sales transactions in this report
  totalSales: { type: Number, required: true }, // Total value of sales in this report
});

const SalesReport = mongoose.model("SalesReport", salesReportSchema);

module.exports = SalesReport;

//reportDate: The date when the report is generated.
//pharmacist: References the pharmacist who generated the report.
//transactions: A list of references to the SalesTransaction records that are included in this report.
//totalSales: The total value of sales included in the report.
