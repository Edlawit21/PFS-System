import { Button, DatePicker, Table, message } from "antd";
import { useState } from "react";
import { columnReport } from "../../Components/Column";
import Api from "../../api/axiosInstance";

const GenerateReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]); // Replace with fetched data
  const [selectedDate, setSelectedDate] = useState(null); // State for the single date
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
    if (!selectedDate) {
      message.error("Please select a date.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      console.log("Fetching reports for date:", formattedDate); // Log the formatted date

      const response = await Api.post(
        "/report/sales-report",
        { date: formattedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API Response:", response.data); // Log the response

      if (response.data && response.data.report) {
        const transactions = response.data.report.transactions;

        if (Array.isArray(transactions)) {
          if (transactions.length === 0) {
            message.info("No transactions found for this date.");
            setData([]); // Clear the data state
          } else {
            setData(transactions); // Update the data state with the transactions
            console.log("Reports:", transactions);
          }
        } else {
          message.error("Unexpected data format for transactions.");
          setData([]); // Clear the data state
        }
      } else {
        message.error("Unexpected data format received.");
        setData([]); // Clear the data state
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data); // Log the error response
        if (error.response.status === 404) {
          const errorMessage =
            error.response.data.message || "Failed to fetch reports.";
          message.error(errorMessage);
        } else {
          message.error(
            "Failed to fetch reports. Please check the console for details."
          );
        }
      } else {
        message.error("Network error or server not reachable.");
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4">Report</h2>
      <div className="flex flex-col gap-2 py-2 bg-white rounded-xl">
        <h3 className="py-3 font-semibold text-xl text-center">Choose Date</h3>
        <div className="font-semibold text-lg flex flex-col items-center gap-8">
          <span>
            Date:{" "}
            <DatePicker
              size="large"
              onChange={(date) => {
                console.log("Selected Date:", date); // Log selected date
                setSelectedDate(date); // Set the selected date
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
            scroll={{
              x: 600,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
