import { Button, DatePicker, Table, message } from "antd";
import { useState } from "react";
import { columnReport } from "../../Components/Column";
import { dataProduct } from "../../Data/data"; // This may need to be replaced with actual fetched data
import Api from "../../api/axiosInstance";

const { RangePicker } = DatePicker; // Destructure RangePicker from DatePicker

const ViewReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(dataProduct); // This should eventually be replaced with actual data fetched from the API
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
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
    const [startDate, endDate] = dateRange; // Destructure start and end dates from the selected range
    if (!startDate || !endDate) {
      message.error("Please select a date range."); // Show error message if dates are not selected
      return;
    }
    const token = localStorage.getItem("token");
    try {
      // Format dates as required by your API (for example, as ISO strings)
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");
      console.log("Fetching reports from:", "/api/report/sales-reports");
      console.log("With data:", {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      const response = await Api.post(
        "/report/sales-report",
        { startDate: formattedStartDate, endDate: formattedEndDate },
        { headers: { Authorization: `Bearer ${token}` } } // Ensure token is correctly retrieved
      );

      setData(response.data); // Update the data state with the fetched reports
      console.log("Reports:", response.data);
    } catch (error) {
      console.error("API Error:", error);
      message.error(
        "Failed to fetch reports. Please check the console for details."
      ); // Show error message on failure
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
                console.log("Selected Dates:", dates); // Log selected dates
                setDateRange(dates); // Set the selected date range
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
            onClick={fetchReports} // Trigger fetch on button click
          >
            Submit
          </Button>
        </div>

        <div className="mx-6">
          <Table
            columns={columnReport}
            dataSource={data} // Use the fetched reports data here
            pagination={pagination}
            style={{
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              borderRadius: "8px",
              marginTop: "16px",
              background: "white",
              border: "1px solid #E3E6EB",
            }}
            showSorterTooltip={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
