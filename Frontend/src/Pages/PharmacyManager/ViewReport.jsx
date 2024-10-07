import { useEffect, useState } from "react";
import Api from "../../api/axiosInstance"; // Ensure this is the correct path to your API instance
import { Table, Spin, message } from "antd"; // Using Ant Design for UI components

const PharmacyManagerList = () => {
  const [pharmacyManagers, setPharmacyManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacyManagers = async () => {
      try {
        const response = await Api.get("/pharmacy-manager/all"); // Adjust the URL as per your API
        console.log("Fetched Pharmacy Managers:", response.data); // Log the fetched data
        setPharmacyManagers(response.data.pharmacyManagers);
      } catch (err) {
        console.error("Error fetching pharmacy managers:", err);
        setError(err.message || "An error occurred while fetching data.");
        message.error("Failed to fetch pharmacy managers.");
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacyManagers();
  }, []);

  // Define columns for the Ant Design table
  const columns = [
    {
      title: "First Name",
      dataIndex: ["user", "firstname"],
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: ["user", "lastname"],
      key: "lastname",
    },
    {
      title: "Username",
      dataIndex: ["user", "username"],
      key: "username",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: ["user", "phoneNumber"],
      key: "phoneNumber",
    },
    {
      title: "Pharmacy Name",
      dataIndex: "pharmaName",
      key: "pharmaName",
    },
    {
      title: "PM Name",
      dataIndex: "pmName",
      key: "pmName",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "City",
      dataIndex: ["addressDetails", "city"], // Changed from address to addressDetails
      key: "city",
    },
    {
      title: "State",
      dataIndex: ["addressDetails", "state"], // Changed from address to addressDetails
      key: "state",
    },
    {
      title: "Operating Days",
      dataIndex: ["addressDetails", "operatingDays"], // Changed from address to addressDetails
      key: "operatingDays",
    },
    {
      title: "Services Offered",
      dataIndex: ["addressDetails", "servicesOffered"], // Changed from address to addressDetails
      key: "servicesOffered",
    },
  ];

  // Render loading spinner or error message
  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render the table with the fetched pharmacy manager data
  return (
    <div>
      <h1>Pharmacy Managers List</h1>
      <Table
        dataSource={pharmacyManagers}
        columns={columns}
        rowKey="pmName" // You can use a unique identifier here
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PharmacyManagerList;
