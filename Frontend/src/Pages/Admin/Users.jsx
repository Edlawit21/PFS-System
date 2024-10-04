import { useState, useEffect } from "react";
import { Table, Select, Input, Button } from "antd";
import { columnUser } from "../../Components/Column";
import "../Doctor/PrescriptionPage/Ant.css";
import Api from "../../api/axiosInstance";
const { Option } = Select;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const roleOptions = [
  { value: "doctor", label: "Doctor" },
  { value: "pmanager", label: "Pharmacy Manager" },
];

const Users = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await Api.get("/users");
        console.log("Fetched users data:", response.data); // This line logs the full response
        console.log("Fetched users:", response.data.users);
        setUsersData(response.data.users);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsersData();
  }, []);

  const handleToggle = async (userId, currentStatus) => {
    console.log("Toggling status for user ID:", userId);
    if (!userId) {
      console.error("User ID is undefined.");
      return; // Exit the function if userId is not defined
    }

    const newStatus = currentStatus === "Active" ? "Inactive" : "Active"; // Toggle status
    try {
      await Api.patch(`/status/users/${userId}/activation`, {
        status: newStatus,
      });
      // Update local state to reflect the change
      setUsersData((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error(
        "Error toggling user status:",
        error.message,
        error.response
      );
      alert(`Error: ${error.message}`); // Optional alert to notify users
    }
  };

  // Combine firstname and lastname into one field 'name'
  const mappedUsersData = usersData.map((user) => ({
    ...user,
    name: `${user.firstname || ""} ${user.lastname || ""}`.trim(), // Combine names and trim extra spaces
  }));

  const handleFilterChange = (values) => {
    setSelectedFilters(values);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = mappedUsersData.filter((item) => {
    const normalizedItem = {
      ...item,
      gender: item.gender ? item.gender.toLowerCase() : "",
      role: item.role ? item.role.toLowerCase() : "",
    };

    const matchesFilters = selectedFilters.every((filter) => {
      const [type, value] = filter.split(":");
      return (
        !value || normalizedItem[type]?.toLowerCase() === value.toLowerCase()
      );
    });

    const matchesSearchText = Object.values(normalizedItem).some((val) =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    );

    return matchesFilters && matchesSearchText;
  });

  const pagination = {
    pageSizeOptions,
    showSizeChanger: true,
    defaultPageSize,
    total: filteredData.length,
    current: currentPage,
    onChange: (page) => {
      setCurrentPage(page);
    },
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
    position: ["bottomCenter"],
  };

  return (
    <div className="w-full h-full">
      <h2 className="pb-2 font-semibold text-2xl">Users</h2>
      <div className="w-full flex items-end justify-between">
        <Select
          placeholder="Filter by"
          size="large"
          style={{ width: "200px", marginRight: "16px" }}
          mode="multiple"
          allowClear
          onChange={handleFilterChange}
          value={selectedFilters}
        >
          {genderOptions.map((option) => (
            <Option
              key={`gender:${option.value}`}
              value={`gender:${option.value}`}
            >
              {option.label}
            </Option>
          ))}
          {roleOptions.map((option) => (
            <Option key={`role:${option.value}`} value={`role:${option.value}`}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Search"
          size="large"
          style={{ width: "200px" }}
          onChange={handleSearch}
        />
      </div>
      <div>
        <Table
          className="center-head"
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
              );
            },
          }}
          columns={columnUser.map((col) => {
            if (col.title === "Action") {
              return {
                ...col,
                render: (text, record) => {
                  if (record.status === "Active") {
                    return (
                      <Button
                        onClick={() => handleToggle(record._id, record.status)}
                      >
                        Deactivate
                      </Button>
                    );
                  } else if (record.status === "Inactive") {
                    return (
                      <Button
                        onClick={() => handleToggle(record._id, record.status)}
                      >
                        Activate
                      </Button>
                    );
                  } else if (record.status === "Pending") {
                    return <span>Pending</span>; // Display pending without a button
                  }
                  return null; // Return null if no action is needed
                },
              };
            }
            return col; // Return original column for others
          })}
          dataSource={filteredData}
          pagination={pagination}
          style={{
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
            marginTop: "16px",
            background: "white",
            border: "1px solid #E3E6EB",
          }}
          showSorterTooltip={false}
          scroll={{ x: 10 }}
        />
      </div>
    </div>
  );
};

export default Users;
