import { useState, useEffect } from "react";
import { Table, Select, Input } from "antd";
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
        setUsersData(response.data.users);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsersData();
  }, []);

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
          columns={columnUser}
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
