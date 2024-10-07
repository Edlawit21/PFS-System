import { columnPharmacist } from "../../Components/Column";
// import { dataProduct } from "../../Data/data"; // Commented out as not used
import { useState, useEffect } from "react";
import { Button, Table, Select, Input, Modal, message, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Api from "../../api/axiosInstance";

const { Option } = Select;

const ViewPharmacist = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [data, setData] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPharmacist, setEditingPharmacist] = useState(null);
  const [form] = Form.useForm();

  const token = localStorage.getItem("token");

  // Fetch pharmacists data

  const fetchPharmacists = async () => {
    try {
      const response = await Api.get("/pharmacist/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setData(
        response.data.pharmacists.map((pharmacist) => ({
          key: pharmacist._id,
          ...pharmacist,
        }))
      );
    } catch (error) {
      console.error(
        "Fetch Pharmacist Error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to fetch Pharmacist. Check console for details.");
    }
  };

  useEffect(() => {
    fetchPharmacists();
  }, [token]);

  const handleRegisterClick = () => {
    navigate("/pmanager/dashboard/pmanager/dashboard/register-p");
  };

  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;

  const filteredData = Array.isArray(data)
    ? data.filter(
        (item) =>
          (!selectedGender || item.gender === selectedGender) &&
          (!searchText ||
            item.name.toLowerCase().includes(searchText.toLowerCase()))
      )
    : [];

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
    setModalContent(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (record) => {
    setEditingPharmacist(record);
    form.setFieldsValue({
      firstname: record.firstname,
      lastname: record.lastname,
      gender: record.gender,
      username: record.username,
      phone: record.contact.phone, // Accessing phone from nested contact field
      email: record.contact.email,
      residentialAddress: record.residentialAddress,
    }); // Populate the form with the record's data
    setIsModalVisible(true); // Show the modal
  };

  const handleEditSubmit = async (values) => {
    try {
      await Api.put(`/pharmacist/update/${editingPharmacist.key}`, values, {
        headers: {
          Authorization: `Bearer ${token}`, // include your token here
        },
      });
      message.success("Pharmacist updated successfully");
      // Refresh the data
      fetchPharmacists();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update pharmacist. Check console for details.");
      console.error(
        "Update Pharmacist Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = async (key) => {
    try {
      await Api.delete(`/pharmacist/${key}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) => prevData.filter((item) => item.key !== key));
      message.success("Pharmacist deleted successfully");
    } catch (error) {
      console.error(
        "Delete Pharmacist Error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to delete Pharmacist. Check console for details.");
    }
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
          placeholder="Filter by gender"
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

      {/* Modal for Viewing Details */}
      <Modal
        title="Pharmacist Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalContent && (
          <div>
            <p>
              <strong>Name:</strong> {modalContent.firstName}{" "}
              {modalContent.lastName}
            </p>
            <p>
              <strong>Username:</strong> {modalContent.username}
            </p>
            <p>
              <strong>Phone:</strong> {modalContent.phone}
            </p>
            <p>
              <strong>Email:</strong> {modalContent.email}
            </p>
            <p>
              <strong>Address:</strong> {modalContent.address}
            </p>
            <p>
              <strong>Gender:</strong> {modalContent.gender}
            </p>
          </div>
        )}
      </Modal>

      {/* Modal for Editing Pharmacist */}
      <Modal
        title="Edit Pharmacist"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item name="firstname" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Select allowClear>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item name="residentialAddress" label="Address">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              style={{ marginLeft: "8px" }}
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewPharmacist;
