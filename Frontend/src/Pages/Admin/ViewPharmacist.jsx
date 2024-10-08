import { useEffect, useState } from "react";
import { Table } from "antd";
import Api from "../../api/axiosInstance"; // Adjust the import based on your file structure
import { columnAdminPharmacist } from "../../Components/Column"; // Adjust the import based on your file structure

const ViewPharmacist = () => {
  const [pharmacistsData, setPharmacistsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchPharmacistsData = async () => {
      setLoading(true);
      try {
        const response = await Api.get(
          `/pharmacist/all?page=${currentPage}&limit=${pageSize}`
        ); // Use pagination parameters
        console.log("Fetched pharmacists data:", response.data); // Log the fetched data

        if (response.data && response.data.pharmacists) {
          setPharmacistsData(response.data.pharmacists); // Set data
          setTotalItems(response.data.total); // Set the total items for pagination
        } else {
          console.error("No pharmacists found in the response");
        }
      } catch (error) {
        console.error("Error fetching pharmacists data:", error);
      }
      setLoading(false);
    };

    fetchPharmacistsData();
  }, [currentPage, pageSize]); // Re-fetch data when page or page size changes

  const defaultPageSize = 5;
  const paginationConfig = {
    current: currentPage,
    defaultPageSize,
    total: totalItems,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "30", "50"],
    onChange: (page, newPageSize) => {
      setCurrentPage(page);
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
    },
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
    position: ["bottomCenter"],
  };

  return (
    <div className="w-full h-full">
      <h2 className="pb-2 font-semibold text-2xl">Pharmacists</h2>
      <Table
        columns={columnAdminPharmacist()} // Call the function to get column definitions
        dataSource={pharmacistsData}
        loading={loading}
        pagination={paginationConfig} // Use the custom pagination config
        rowKey={(record) => record._id} // Assuming _id is the unique identifier for each pharmacist
        style={{
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
          marginTop: "16px",
          background: "white",
          border: "1px solid #E3E6EB",
        }}
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
};

export default ViewPharmacist;
