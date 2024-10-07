import { useEffect, useState } from "react";
import { Divider, Modal, Button, InputNumber, message } from "antd";
import Api from "../../api/axiosInstance";
import { useParams } from "react-router";

const PrescriptionQrSearch = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { qr } = useParams();
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [saleError, setSaleError] = useState({});
  const [saleSuccess, setSaleSuccess] = useState({});

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const response = await Api.get(`/prescription/${qr}`);
        console.log("Prescription data fetched:", response.data); // Debugging: Log fetched prescription data
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptionData();
  }, [qr]);

  const fetchMedicationDetails = async (medicationName) => {
    try {
      const response = await Api.get(
        `/product/getallProduct?query=${encodeURIComponent(medicationName)}`
      );
      const data = response.data[0];
      console.log("Fetched medication details:", data); // Debugging: Log fetched medication details
      setSelectedMedication(data);
      setIsModalVisible(true);
      setTotalPrice(data.sellPrice * quantity);
    } catch (error) {
      console.error("Error searching for medication:", error);
      message.error("Failed to fetch medication details.");
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = value || 1;
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * selectedMedication.sellPrice);
  };

  const handleMakeSale = async () => {
    if (!selectedMedication) {
      message.error("No medication selected.");
      return;
    }

    console.log("Selected medication:", selectedMedication); // Debugging: Log selected medication
    const medicineId = selectedMedication._id; // Use _id instead of id

    if (quantity <= 0 || quantity > selectedMedication.quantity) {
      setSaleError((prev) => ({
        ...prev,
        [medicineId]: "Please enter a valid quantity",
      }));
      message.error("Please enter a valid quantity.");
      return;
    }

    setLoading(true);
    try {
      const payload = { medicineId, quantity };
      console.log("Request payload:", payload); // Debugging: Log the payload
      const response = await Api.post("/sales/createSales", payload);
      console.log("API response:", response); // Debugging: Log the API response
      setSaleSuccess((prev) => ({
        ...prev,
        [medicineId]: "Sale recorded successfully",
      }));
      message.success("Sale recorded successfully.");
      setIsModalVisible(false); // Close modal after successful sale
    } catch (error) {
      console.error(
        "Error processing the sale:",
        error.response?.data || error
      );
      setSaleError((prev) => ({
        ...prev,
        [selectedMedication._id]: "Error processing the sale",
      }));
      message.error("Failed to process the sale.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData || !formData.medications?.length) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Prescription Not Found
        </h1>
        <Divider />
        <p className="text-center">
          No prescription data available for the provided QR code.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Prescription</h1>
      <Divider />

      <div className="mb-6">
        <h4 className="text-lg font-medium">
          Prescription Date:{" "}
          <span className="font-normal">
            {formatDate(formData.prescriptionDate)}
          </span>
        </h4>
      </div>

      <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
      <hr className="my-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium">
            Name:{" "}
            <span className="font-normal">
              {`${formData.patient?.name?.first || "N/A"} ${
                formData.patient?.name?.last || ""
              }`}
            </span>
          </h4>
          <h4 className="font-medium">
            Gender:{" "}
            <span className="font-normal">
              {formData.patient?.gender === "Male" ? "Male" : "Female"}
            </span>
          </h4>
          <h4 className="font-medium">
            Allergies:{" "}
            <span className="font-normal">
              {formData.patient?.allergies || "None"}
            </span>
          </h4>
        </div>
        <div>
          <h4 className="font-medium">
            Age:{" "}
            <span className="font-normal">
              {formData.patient?.age || "N/A"}
            </span>
          </h4>
          <h4 className="font-medium">
            Phone Number:{" "}
            <span className="font-normal">
              {formData.patient?.phonenumber || "N/A"}
            </span>
          </h4>
          <h4 className="font-medium">
            Notable Health Condition:{" "}
            <span className="font-normal">
              {formData.patient?.condition || "None"}
            </span>
          </h4>
        </div>
      </div>

      <div className="my-6">
        <h4 className="text-lg font-semibold mb-2">
          List of Prescribed Medication:
        </h4>
        {formData.medications.map((med, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-lg mb-2 shadow-sm"
          >
            <h4 className="font-medium">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => fetchMedicationDetails(med.medicationName)}
              >
                Medication Name: {med.medicationName}
              </span>
            </h4>
            <p className="font-medium">
              Purpose: <span className="font-normal">{med.purpose}</span>
            </p>
            <p className="font-medium">
              Dosage: <span className="font-normal">{med.dosage}</span>
            </p>
            <p className="font-medium">
              Route: <span className="font-normal">{med.route}</span>
            </p>
            <p className="font-medium">
              Frequency: <span className="font-normal">{med.frequency}</span>
            </p>
          </div>
        ))}
      </div>

      <Modal
        title={`Medication Details for ${selectedMedication?.medname}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="make-sale"
            type="primary"
            onClick={handleMakeSale}
            disabled={quantity <= 0 || quantity > selectedMedication?.remainQty}
          >
            Make Sale
          </Button>,
        ]}
      >
        {selectedMedication ? (
          <div>
            <p>
              <strong>Medication Name:</strong> {selectedMedication.medname}
            </p>
            <p>
              <strong>Category:</strong> {selectedMedication.category?.category}{" "}
              - {selectedMedication.category?.subcategory}
            </p>
            <p>
              <strong>Actual Price:</strong> ${selectedMedication.actualPrice}
            </p>
            <p>
              <strong>Sell Price:</strong> ${selectedMedication.sellPrice}
            </p>
            <p>
              <strong>Remaining Quantity:</strong>{" "}
              {selectedMedication.remainQty}
            </p>
            <p>
              <strong>Expire Date:</strong>{" "}
              {formatDate(selectedMedication.expireDate)}
            </p>

            <p>
              <strong>Quantity:</strong>
            </p>
            <InputNumber
              min={1}
              max={selectedMedication.remainQty}
              value={quantity}
              onChange={handleQuantityChange}
              style={{ marginBottom: "10px" }}
            />
            <p>
              <strong>Total Price:</strong> ${totalPrice}
            </p>
          </div>
        ) : (
          <p>No medication details available.</p>
        )}
      </Modal>
    </div>
  );
};

export default PrescriptionQrSearch;
