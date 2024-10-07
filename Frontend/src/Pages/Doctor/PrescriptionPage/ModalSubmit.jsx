import { useEffect, useState } from "react";
import { Divider } from "antd";
import PropTypes from "prop-types";
import Api from "../../../api/axiosInstance"; // Import your Axios instance

const ModalSubmit = ({ prescriptionId }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  console.log(prescriptionId);

  // Helper function to format the date
  const formatDate = (date) => {
    if (!date) return "N/A"; // Return fallback text if date is not present
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Formats date as "YYYY-MM-DD"
    return formattedDate;
  };

  useEffect(() => {
    // Fetch prescription data using the prescriptionId
    const fetchPrescriptionData = async () => {
      try {
        const response = await Api.get(`/prescription/${prescriptionId}`);
        console.log("pres log", response.data);

        setFormData(response.data); // Set the fetched data
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request completes
      }
    };
    fetchPrescriptionData();
  }, [prescriptionId]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  return (
    <div>
      <h1 className="pt-6 flex justify-center">Prescription Form</h1>
      <Divider style={{ borderColor: "#e0e0e0", borderWidth: "1px" }} />
      <div>
        <div className="flex justify-between mx-24">
          <h4>Prescription Date: {formatDate(formData.prescriptionDate)}</h4>
        </div>

        <h2 className="mx-24">Patient Information</h2>
        <hr className="mt-3 mb-4 mx-20" />
        <div className="mx-24 flex justify-between">
          <span>
            <h4>
              Name:{" "}
              {`${formData.patient?.name?.first || "N/A"} ${
                formData.patient?.name?.last || ""
              }`}
            </h4>
            <h4>
              Gender: {formData.patient?.gender === "Male" ? "Male" : "Female"}
            </h4>
            <h4>Allergies: {formData.patient?.allergies || "None"}</h4>
          </span>
          <span>
            <h4>Age: {formData.patient?.age || "N/A"}</h4>
            <h4>Phone Number: {formData.patient?.phonenumber || "N/A"}</h4>
            <h4>
              Notable Health Condition: {formData.patient?.condition || "None"}
            </h4>
          </span>
        </div>

        <div className="mx-24">
          <h4>List of Prescribed Medication:</h4>
          {formData.medications && formData.medications.length > 0 ? (
            formData.medications.map((med, index) => (
              <div key={index} style={{ marginBottom: "8px" }}>
                <h4>Medication Name: {med.medicationName}</h4>
                <p>Purpose: {med.purpose}</p>
                <p>Dosage: {med.dosage}</p>
                <p>Route: {med.route}</p>
                <p>Frequency: {med.frequency}</p>
              </div>
            ))
          ) : (
            <h4>No medications prescribed.</h4>
          )}
        </div>

        <div className="mx-24 flex justify-between">
          <span>
            <h4>
              Physician Name:{" "}
              {`${formData.physician?.name?.first || "N/A"} ${
                formData.physician?.name?.last || ""
              }`}
            </h4>
            <h4>Physician Signature</h4>
            {formData.signature ? (
              <img
                src={formData.signature}
                alt="Physician Signature"
                style={{
                  width: "200px",
                  height: "auto",
                  border: "1px solid #e0e0e0",
                  marginTop: "8px",
                }}
              />
            ) : (
              <h4>No signature available.</h4>
            )}
          </span>
          <span>
            <h4>
              Physician Phone Number: {formData.physician?.phonenumber || "N/A"}
            </h4>
          </span>
        </div>
        <hr className="mt-3 mb-4 mx-20" />
      </div>
    </div>
  );
};

ModalSubmit.propTypes = {
  prescriptionId: PropTypes.string.isRequired, // Prop to receive prescriptionId
};

export default ModalSubmit;
