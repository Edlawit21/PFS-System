import { Button, DatePicker, Table, message } from "antd";
import { useState } from "react";
import { columnReport } from "../../Components/Column";
import Api from "../../api/axiosInstance";

const { RangePicker } = DatePicker;

const ViewReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]); // Start with an empty array
  const [dateRange, setDateRange] = useState([null, null]);
  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;

  const pagination = {
    pageSizeOptions,
    showSizeChanger: true,
    defaultPageSize,
    total: data.length,
    current: currentPage,
    onChange: (page) => {
      setCurrentPage(page);
    },
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
    position: ["bottomCenter"],
  };
  const fetchReports = async () => {
    const [startDate, endDate] = dateRange;
    if (!startDate || !endDate) {
      message.error("Please select a date range.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");

      const response = await Api.post(
        "/report/sales-reports",
        { startDate: formattedStartDate, endDate: formattedEndDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Log the entire API response
      console.log("API Response:", response.data); // Check the response structure

      // Ensure that the response.data contains the expected structure
      if (response.data && Array.isArray(response.data.reports)) {
        const reportsWithKeys = response.data.reports.flatMap((report) =>
          report.transactions.map((transaction) => ({
            medicineName: transaction.medicineName || "", // Extract medicine name
            quantity: transaction.quantity || "0", // Extract quantity
            totalPrice: transaction.totalPrice
              ? transaction.totalPrice.toFixed(2)
              : "0.00", // Format totalPrice
            date: transaction.date || new Date().toISOString(), // Extract date
            key: transaction._id || Math.random().toString(36).substr(2, 9), // Generate a unique key if needed
          }))
        );

        setData(reportsWithKeys);
        console.log("Fetched Reports Data:", reportsWithKeys); // Check the data structure
      } else {
        message.error("Unexpected response format.");
      }
    } catch (error) {
      console.error("API Error:", error);
      message.error("No reports found");
    }
  };

  return (
    <div>
      <h2 className="mb-4">Report</h2>
      <div className="flex flex-col gap-2 py-2 bg-white rounded-xl">
        <h3 className="py-3 font-semibold text-xl text-center">Choose Date</h3>
        <div className="font-semibold text-lg flex flex-col items-center gap-8">
          <span>
            Date Range:{" "}
            <RangePicker
              size="large"
              onChange={(dates) => {
                console.log("Selected Dates:", dates);
                setDateRange(dates);
              }}
            />
          </span>
          <Button
            size="large"
            style={{
              width: "200px",
              backgroundColor: "blue",
              color: "white",
              fontSize: "large",
            }}
            onClick={fetchReports}
          >
            Submit
          </Button>
        </div>

        <div className="mx-6">
          <Table
            columns={columnReport}
            dataSource={data}
            pagination={pagination}
            style={{
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              borderRadius: "8px",
              marginTop: "16px",
              background: "white",
              border: "1px solid #E3E6EB",
            }}
            showSorterTooltip={false}
            scroll={{
              x: 600,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
