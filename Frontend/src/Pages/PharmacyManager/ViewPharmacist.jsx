import { columnPharmacist } from "../../Components/Column";
import { dataProduct } from "../../Data/data";
import { useState } from "react";
import { Button, Table, Select, Input, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const ViewPharmacist = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [data, setData] = useState(dataProduct);
  const [selectedGender, setSelectedGender] = useState(""); // State for selected category
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleRegisterClick = () => {
    navigate("/register-p");
  };

  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;

  const filteredData = data.filter(
    (item) =>
      (!selectedGender || item.category === selectedGender) &&
      (!searchText ||
        item.name.toLowerCase().includes(searchText.toLowerCase()))
  );

  const pagination = {
    pageSizeOptions,
    showSizeChanger: true,
    defaultPageSize,
    total: filteredData.length,
    current: currentPage,
    onChange: (page) => setCurrentPage(page),
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
    position: ["bottomCenter"],
  };

  const showModal = (record) => {
    setModalContent(record); // Set the content for the modal based on the clicked row
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    navigate("/register-p");
  };

  const handleSelectedGender = (value) => {
    setSelectedGender(value);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleDeleteSelected = () => {
    setData((prevData) =>
      prevData.filter((item) => !selectedRowKeys.includes(item.key))
    );
    setSelectedRowKeys([]);
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  return (
    <div>
      <h2 className="pb-2 font-semibold text-2xl">View Pharmacists</h2>
      <div className="w-full flex justify-between py-6">
        <Input
          placeholder="Search"
          size="large"
          style={{ width: "200px", marginRight: "16px" }}
          onChange={handleSearch}
        />
        <Select
          placeholder="Filter by category"
          size="large"
          style={{ width: "260px" }}
          onChange={handleSelectedGender}
          allowClear
        >
          <Option value="">All</Option>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
        </Select>
      </div>
      <div className="bg-white p-6 rounded-xl">
        <div className="flex justify-end gap-4">
          <Button
            onClick={handleRegisterClick}
            style={{ background: "blue", color: "white" }}
          >
            <PlusOutlined />
            Register Pharmacist
          </Button>
          {selectedRowKeys.length >= 2 && (
            <Button
              onClick={handleDeleteSelected}
              style={{ background: "red", color: "white" }}
            >
              <DeleteOutlined /> Delete Selected
            </Button>
          )}
        </div>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: handleSelectChange,
          }}
          columns={columnPharmacist(handleEdit, handleDelete, showModal)}
          dataSource={filteredData}
          pagination={pagination}
          style={{
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
            marginTop: "16px",
            width: "100%",
            background: "white",
            border: "1px solid #E3E6EB",
          }}
          showSorterTooltip={false}
          scroll={{
            x: 1300,
          }}
        />
      </div>
      <Modal
        title="Document Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalContent && (
          <div>
            <p>
              <strong>Name:</strong> {modalContent.name}
            </p>
            <p>
              <strong>Username:</strong> {modalContent.username}
            </p>
            <p>
              <strong>Email:</strong> {modalContent.email}
            </p>
            {/* Add more details as needed */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewPharmacist;
