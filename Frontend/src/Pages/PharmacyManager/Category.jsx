import { Button, Table, Select, Input } from "antd";
import "../Doctor/PrescriptionPage/Ant.css";
import { columnCategory } from "../../Components/Column";
import { useState } from "react";
import { dataCat } from "../../Data/data";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryModal from "./CategoryModal";

const { Option } = Select;

const Category = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(dataCat);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;

  const filteredData = data.filter(
    (item) =>
      (!selectedSubCategory || item.category === selectedSubCategory) &&
      (item.category.toLowerCase().includes(searchText.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchText.toLowerCase()))
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

  const handleModalOpen = (record = null) => {
    setEditingRecord(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingRecord(null);
  };

  const handleAddCategory = (newCategory) => {
    if (editingRecord) {
      // Update existing category
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editingRecord.key ? { ...item, ...newCategory } : item
        )
      );
    } else {
      // Add new category
      setData((prevData) => [...prevData, { key: Date.now(), ...newCategory }]);
    }
    handleModalClose();
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
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

  const handleExpand = (key) => {
    setExpandedRowKeys((prev) => (prev.includes(key) ? [] : [key]));
  };

  const handleEdit = (record) => {
    handleModalOpen(record);
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  return (
    <div className="w-full h-full">
      <h2 className="pb-2 font-semibold text-2xl">Categories</h2>
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
          onChange={handleSubCategoryChange}
          allowClear
        >
          <Option value="">All</Option>
          <Option value="Prescription Medication">
            Prescription Medication
          </Option>
          <Option value="Over-the-Counter (OTC) Medications">
            Over-the-Counter (OTC) Medications
          </Option>
          <Option value="Controlled Substances">Controlled Substances</Option>
          <Option value="Specialty Medications">Specialty Medications</Option>
          <Option value="Medical Supplies">Medical Supplies</Option>
          <Option value="Health and Wellness Products">
            Health and Wellness Products
          </Option>
        </Select>
      </div>
      <div className="bg-white p-6 rounded-xl">
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => handleModalOpen()}
            style={{ background: "blue", color: "white" }}
          >
            <PlusOutlined />
            Add Category
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
          columns={columnCategory(
            expandedRowKeys,
            handleExpand,
            handleEdit,
            handleDelete
          )}
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
        />
      </div>
      <CategoryModal
        visible={modalVisible}
        onClose={handleModalClose}
        onAdd={handleAddCategory}
        initialValues={editingRecord}
      />
    </div>
  );
};

export default Category;
