import { columnProduct } from "../../Components/Column";
import { dataProduct } from "../../Data/data"; // Default data
import { useState, useEffect } from "react";
import { Button, Table, Input, message } from "antd";
import ProductModal from "./ProductModal";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Api from "../../api/axiosInstance";

const Products = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState([]);

  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;

  const fetchProducts = async () => {
    try {
      const response = await Api.get("/pharmacy-manager/all");
      console.log("Fetched products response:", response.data);

      if (
        response.data.pharmacyManagers &&
        Array.isArray(response.data.pharmacyManagers)
      ) {
        const allProducts = response.data.pharmacyManagers.flatMap(
          (pharmacy) => {
            if (Array.isArray(pharmacy.products)) {
              return pharmacy.products.map((product) => {
                console.log("Product fetched:", product); // Log each product
                return {
                  key: product._id || product.medname + Math.random(),
                  _id: product._id, // This should be the id
                  medname: product.medname,
                  actualPrice: product.actualPrice,
                  sellPrice: product.sellPrice,
                  quantity: product.quantity,
                  expireDate: product.expireDate,
                  registerDate: product.registerDate,
                  remainQty: product.remainQty,
                  soldQty: product.soldQty,
                };
              });
            }
            return [];
          }
        );

        setData(allProducts);
        console.log("Data set in state:", allProducts);
      } else {
        throw new Error(
          "Response data does not contain pharmacyManagers array"
        );
      }
    } catch (error) {
      console.error(
        "Fetch products Error:",
        error.response ? error.response.data : error.message
      );
      message.error(error.response ? error.response.data : error.message);
      setData(dataProduct);
    }
  };

  const filteredData = data.filter((item) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    return item.medname?.toLowerCase().includes(lowerCaseSearchText);
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
      if (editingRecord) {
        // Update existing product
        const response = await Api.put(
          `/product/${editingRecord._id}`,
          newProduct
        );
        setData((prevData) =>
          prevData.map((item) =>
            item._id === editingRecord._id
              ? { ...item, ...response.data }
              : item
          )
        );
      } else {
        // Add new product
        const response = await Api.post("/product/createProduct", newProduct);
        console.log(response.data);

        setData((prevData) => [...prevData, response.data]);
      }
      message.success("Product added successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to save product.");
    } finally {
      handleModalClose();
    }
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
          await Api.delete(`/product/delete/${key}`);
        })
      );

      setData((prevData) =>
        prevData.filter((item) => !selectedRowKeys.includes(item.medname))
      );
      setSelectedRowKeys([]);
      message.success("Selected products deleted successfully");
    } catch (error) {
      message.error(error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (record) => {
    handleModalOpen(record);
  };

  const handleDelete = async (id) => {
    try {
      console.log(id); // Log the id to see its value
      await Api.delete(`/product/delete/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id)); // Use _id for filtering
      message.success("Product deleted successfully");
    } catch (error) {
      message.error(error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      </div>
      <div className="bg-white p-6 rounded-xl">
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => handleModalOpen()}
            style={{ background: "blue", color: "white" }}
          >
            <PlusOutlined /> Add Product
          </Button>
          {selectedRowKeys.length > 0 && (
            <Button
              onClick={handleDeleteSelected}
              style={{ background: "red", color: "white" }}
              disabled={selectedRowKeys.length < 1} // Disable if no products selected
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
          dataSource={filteredData} // Pass filtered data
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
            x: 900,
          }}
        />
      </div>
      <ProductModal
        visible={modalVisible}
        onClose={handleModalClose}
        onAdd={handleAddProduct}
        editingRecord={editingRecord}
      />
    </div>
  );
};

export default Products;
