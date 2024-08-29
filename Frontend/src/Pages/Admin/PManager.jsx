import { useState } from "react";
import { Table, Modal, Select } from "antd";
import { columnPm } from "../../Components/Column";
import { dataDoc } from "../../Data/data";
import "../Doctor/PrescriptionPage/Ant.css";

const { Option } = Select;

const PManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedGender, setSelectedGender] = useState(""); // State for selected gender

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

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;
  const totalEntries = dataDoc.length;

  const pagination = {
    pageSizeOptions,
    showSizeChanger: true,

    defaultPageSize,
    total: totalEntries,
    current: currentPage,
    onChange: (page) => {
      setCurrentPage(page);
    },
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`, // Correctly formatted showTotal
    position: ["bottomCenter"], // Correctly placed position property
  };

  // Filter data based on the selected gender
  const filteredData = dataDoc.filter(
    (item) => !selectedGender || item.gender === selectedGender
  );

  return (
    <div className="w-full h-full">
      <h2 className="pb-2 font-semibold text-2xl">Pharmacy Manager Approval</h2>
      <div className="w-full flex items-end justify-end">
        <Select
          placeholder="Filter by gender"
          size="large"
          style={{ width: "200px" }}
          onChange={handleGenderChange} // Update selected gender on change
        >
          <Option value="">All</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
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
          columns={columnPm(showModal)} // Pass showModal to columns
          dataSource={filteredData} // Use filtered data
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

export default PManager;
