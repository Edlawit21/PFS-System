import { columnProduct } from "../../Components/Column";
import { dataProduct } from "../../Data/data"; // Default data
import { useState, useEffect } from "react";
import { Button, Table, Select, Input, message } from "antd";
import ProductModal from "./ProductModal";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Api from "../../api/axiosInstance";

const { Option } = Select;

const Products = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]); // Initialize as an empty array
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Api.get("/product/getallProduct");
        console.log("Fetched products:", response.data);

        // Ensure each product has a unique key
        const productsWithKey = response.data.map((product) => ({
          ...product,
          key: product._id, // assuming _id is your unique identifier
        }));

        setData(productsWithKey); // Set the fetched data here
      } catch (error) {
        console.error(
          "Fetch products Error:",
          error.response ? error.response.data : error.message
        );
        message.error(error.response ? error.response.data : error.message);
        setData(dataProduct); // Fallback to default data
      }
    };

    fetchProducts();

    console.log("loggg", data);
  }, []);

  const filteredData = data.filter((item) => {
    const categoryMatches =
      item.category &&
      typeof item.category === "string" &&
      item.category.toLowerCase().includes(searchText.toLowerCase());

    const subcategoryMatches =
      item.subcategory &&
      typeof item.subcategory === "string" &&
      item.subcategory.toLowerCase().includes(searchText.toLowerCase());

    return (
      (!selectedSubCategory || item.category === selectedSubCategory) &&
      (categoryMatches || subcategoryMatches)
    );
  });

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

  const handleAddProduct = async (newProduct) => {
    try {
      const response = editingRecord
        ? await Api.put(`/product/${editingRecord._id}`, newProduct)
        : await Api.post("/product/createProduct", newProduct);

      const savedProduct = response.data;
      setData((prevData) =>
        editingRecord
          ? prevData.map((item) =>
              item._id === editingRecord._id ? savedProduct : item
            )
          : [...prevData, savedProduct]
      );
      handleModalClose();
      message.success(
        `Product ${editingRecord ? "updated" : "added"} successfully`
      );
    } catch (error) {
      console.log(error);

      message.error(error.message);
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
        selectedRowKeys.map(async (key) => {
          await Api.delete(`/product/${key}`);
        })
      );

      setData((prevData) =>
        prevData.filter((item) => !selectedRowKeys.includes(item._id))
      );
      setSelectedRowKeys([]);
      message.success("Selected products deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleEdit = (record) => {
    handleModalOpen(record);
  };

  const handleDelete = async (key) => {
    try {
      await Api.delete(`/product/${key}`);
      setData((prevData) => prevData.filter((item) => item._id !== key));
      message.success("Product deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="pb-2 font-semibold text-2xl">Products</h2>
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
            Add Product
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
          columns={columnProduct(handleEdit, handleDelete)}
          dataSource={data} // Filtered data
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
            x: 10,
          }}
        />
      </div>
      <ProductModal
        visible={modalVisible}
        onClose={handleModalClose}
        onAdd={handleAddProduct}
        initialValues={editingRecord}
      />
    </div>
  );
};

export default Products;
