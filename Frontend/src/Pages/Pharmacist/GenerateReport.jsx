import { Button, DatePicker, Table } from "antd";
import { columnReport } from "../../Components/Column";
import { useState } from "react";
import { dataProduct } from "../../Data/data";

const GenerateReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(dataProduct);
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
      // Optionally handle pageSize change here
    },
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
    position: ["bottomCenter"],
  };

  return (
    <div>
      <h2 className="mb-4">Report</h2>
      <div className="flex flex-col gap-2 py-2 bg-white rounded-xl">
        <h3 className="py-3 font-semibold text-xl text-center">Choose Date</h3>
        <div className="font-semibold text-lg flex flex-col items-center gap-8">
          <div className="flex gap-10">
            <span>
              From: <DatePicker size="large" />
            </span>
            <span>
              To: <DatePicker size="large" />
            </span>
          </div>
          <Button
            size="large"
            style={{
              width: "200px",
              backgroundColor: "blue",
              color: "white",
              fontSize: "large",
            }}
          >
            Submit
          </Button>
        </div>

        <div className="mx-6">
          <Table
            columns={columnReport}
            dataSource={data} // Use the state data here
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

export default GenerateReport;
