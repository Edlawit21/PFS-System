import { useState, useEffect } from "react";
import { Table, Modal, Button, Select, message } from "antd";
import { columnDoc } from "../../Components/Column";
//import { dataDoc } from "../../Data/data";
import "../Doctor/PrescriptionPage/Ant.css";
import Api from "../../api/axiosInstance";

const { Option } = Select;
//const { Title } = Typography;

const DocApprove = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedGender, setSelectedGender] = useState(""); // State for selected gender
  const [doctorData, setDoctorData] = useState([]); // State for doctor data
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingDocument, setViewingDocument] = useState(null);

  useEffect(() => {
    // Fetch doctor registrations from the backend
    const fetchDoctorData = async () => {
      try {
        const response = await Api.get("/approve/doctors"); // Adjust the URL as needed
        console.log(
          "Fetched doctor data:",
          response.data.doctorsWithUserDetails
        );
        setDoctorData(response.data.doctorsWithUserDetails);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, []);

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
  const handleViewDocument = (url) => {
    setViewingDocument(url); // Set the URL of the document to be viewed
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };
  const refreshDoctorData = async () => {
    try {
      const response = await Api.get("/approve/doctors");
      setDoctorData(response.data.doctorsWithUserDetails);
    } catch (error) {
      console.error("Error refreshing doctor data:", error);
      message.error("Failed to refresh doctor data.");
    }
  };

  const handleApprove = async (doctorId) => {
    try {
      await Api.put(`/approve/doctors/${doctorId}`, { status: "Approved" });
      message.success("Doctor approved successfully!");
      await refreshDoctorData(); // Refresh the doctor data
    } catch (error) {
      console.error("Error approving doctor:", error);
      message.error("Failed to approve doctor.");
    }
  };

  const handleReject = async (doctorId) => {
    try {
      await Api.put(`/approve/doctors/${doctorId}`, { status: "Rejected" });
      message.success("Doctor rejected successfully!");
      await refreshDoctorData(); // Refresh the doctor data
    } catch (error) {
      console.error("Error rejecting doctor:", error);
      message.error("Failed to reject doctor.");
    }
  };

  const pageSizeOptions = ["5", "10", "30", "40", "50"];
  const defaultPageSize = 5;

  const pagination = {
    pageSizeOptions,
    showSizeChanger: true,
    defaultPageSize,
    total: doctorData.length, // Use the length of doctorData    ,
    current: currentPage,
    onChange: (page) => {
      setCurrentPage(page);
    },
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`, // Correctly formatted showTotal
    position: ["bottomCenter"], // Correctly placed position property
  };

  // Filter data based on the selected gender
  const filteredData = doctorData.filter(
    (item) => !selectedGender || item.gender === selectedGender
  );

  const renderDocumentPreview = (url) => {
    if (!url) {
      return <div>No document available.</div>;
    }

    if (url.endsWith(".pdf")) {
      return (
        <iframe
          src={url}
          style={{ width: "100%", height: "500px", border: "none" }}
          title="PDF Viewer"
        />
      );
    }

    if (url.endsWith(".doc") || url.endsWith(".docx")) {
      // URL encoding
      const encodedUrl = encodeURIComponent(url);
      const viewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
      return (
        <iframe
          src={viewerUrl}
          style={{ width: "100%", height: "500px", border: "none" }}
          title="Document Viewer"
        />
      );
    }
    return <div>Unsupported document type.</div>;
  };

  return (
    <div className="w-full h-full">
      <h2 className="pb-2 font-semibold text-2xl">Doctor Approval</h2>
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
          columns={columnDoc(showModal, handleApprove, handleReject)} // Pass showModal to columns
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
              <strong>Name:</strong> {modalContent.docName}
            </p>
            <p>
              <strong>Username:</strong> {modalContent.user.username}
            </p>
            <p>
              <strong>Email:</strong> {modalContent.user.email}
            </p>
            <p>
              <strong>Educational Info:</strong>
              <Button
                type="link"
                onClick={() => handleViewDocument(modalContent.educationalInfo)}
              >
                View Document
              </Button>
            </p>
            <p>
              <strong>Medical License:</strong>
              <Button
                type="link"
                onClick={() => handleViewDocument(modalContent.medicalLicense)}
              >
                View Document
              </Button>
            </p>
            <p>
              <strong>Certificate:</strong>
              {modalContent.certificate ? (
                <Button
                  type="link"
                  onClick={() => handleViewDocument(modalContent.certificate)}
                >
                  View Document
                </Button>
              ) : (
                "No certificate uploaded"
              )}
            </p>
          </div>
        )}
        {viewingDocument && (
          <div style={{ marginTop: 20 }}>
            {renderDocumentPreview(viewingDocument)}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DocApprove;
