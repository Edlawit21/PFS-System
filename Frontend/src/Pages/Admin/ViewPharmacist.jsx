import { useEffect, useState } from "react";
import { Table } from "antd";
import Api from "../../api/axiosInstance"; // Adjust the import based on your file structure
import { columnAdminPharmacist } from "../../Components/Column"; // Adjust the import based on your file structure

const ViewPharmacist = () => {
  const [pharmacistsData, setPharmacistsData] = useState([]);

  useEffect(() => {
    const fetchPharmacistsData = async () => {
      try {
        const response = await Api.get("/pharmacist/all"); // Adjust the API endpoint as necessary
        console.log("Fetched pharmacists data:", response.data); // Log the fetched data
        setPharmacistsData(response.data.pharmacists); // Adjust based on the API response structure
      } catch (error) {
        console.error("Error fetching pharmacists data:", error);
      }
    };

    fetchPharmacistsData();
  }, []);

  return (
    <div className="w-full h-full">
      <h2 className="pb-2 font-semibold text-2xl">Pharmacists</h2>
      <Table
        columns={columnAdminPharmacist()} // Call the function to get column definitions
        dataSource={pharmacistsData}
        pagination={{ pageSize: 10 }} // You can customize the pagination as needed
        rowKey={(record) => record._id} // Assuming _id is the unique identifier for each pharmacist
        style={{
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
          marginTop: "16px",
          background: "white",
          border: "1px solid #E3E6EB",
        }}
      />
    </div>
  );
};

export default ViewPharmacist;
