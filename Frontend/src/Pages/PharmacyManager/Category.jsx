import { Button, Table, Select, Input, message } from "antd";
import "../Doctor/PrescriptionPage/Ant.css";
import { columnCategory } from "../../Components/Column";
import { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryModal from "./CategoryModal";
import Api from "../../api/axiosInstance";

const { Option } = Select;

const Category = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]); // Start with an empty array
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Api.get("/category/allCategory");
        setData(response.data);
      } catch (error) {
        console.error("Fetch Categories Error:", error); // Log the detailed error
        message.error("Failed to fetch categories. Check console for details.");
      }
    };

    fetchCategories();
    console.log("cat", data);
  }, []); // Run this effect only once on component mount

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

  const handleAddCategory = async (newCategory) => {
    try {
      if (editingRecord) {
        // Update existing category
        const response = await Api.put(
          `/category/${editingRecord._id}`,
          newCategory
        );
        setData((prevData) =>
          prevData.map((item) =>
            item._id === editingRecord._id
              ? { ...item, ...response.data }
              : item
          )
        );
      } else {
        // Add new category
        const response = await Api.post(
          "/category/createCategory",
          newCategory
        );
        setData((prevData) => [...prevData, response.data]);
      }
      message.success("Category saved successfully!");
    } catch (error) {
      message.error("Failed to save category.");
    } finally {
      handleModalClose();
    }
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

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map((key) => Api.delete(`/category/${key}`))
      );
      setData((prevData) =>
        prevData.filter((item) => !selectedRowKeys.includes(item._id))
      );
      setSelectedRowKeys([]);
      message.success("Selected categories deleted successfully!");
    } catch (error) {
      message.error("Failed to delete selected categories.");
    }
  };

  const handleExpand = (key) => {
    setExpandedRowKeys((prev) => (prev.includes(key) ? [] : [key]));
  };

  const handleEdit = (record) => {
    handleModalOpen(record);
  };

  const handleDelete = async (key) => {
    try {
      await Api.delete(`/category/${key}`);
      setData((prevData) => prevData.filter((item) => item._id !== key));
      message.success("Category deleted successfully!");
    } catch (error) {
      message.error("Failed to delete category.");
    }
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
          {data.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}{" "}
              {/* Adjust keys based on your actual data structure */}
            </Option>
          ))}
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
        categories={data}
      />
    </div>
  );
};

export default Category;
