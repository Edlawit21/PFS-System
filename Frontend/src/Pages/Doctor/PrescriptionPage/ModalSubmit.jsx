import { Divider } from "antd";
import PropTypes from "prop-types";

const ModalSubmit = ({ formData }) => {
  // Helper function to format the date
  const formatDate = (date) => {
    if (!date) return "N/A"; // Return fallback text if date is not present
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Formats date as "YYYY-MM-DD"
    return formattedDate;
  };

  // Ensure formData is not undefined or null
  const safeFormData = formData || {};

  return (
    <div>
      <h1 className="pt-6 flex justify-center">Prescription Form</h1>
      <Divider style={{ borderColor: "#e0e0e0", borderWidth: "1px" }} />
      <div>
        <div className="flex justify-between mx-24">
          <h4>
            Prescription Date: {formatDate(safeFormData.prescriptionDate)}
          </h4>
        </div>

        <h2 className="mx-24">Patient Information</h2>
        <hr className="mt-3 mb-4 mx-20" />
        <div className="mx-24 flex justify-between">
          <span>
            <h4>
              Name:{" "}
              {`${safeFormData.patient?.name?.first || "N/A"} ${
                safeFormData.patient?.name?.last || ""
              }`}
            </h4>
            <h4>
              Gender:{" "}
              {safeFormData.patient?.gender === "Male" ? "Male" : "Female"}
            </h4>
            <h4>Allergies: {safeFormData.patient?.allergies || "None"}</h4>
          </span>
          <span>
            <h4>Age: {safeFormData.patient?.age || "N/A"}</h4>
            <h4>Phone Number: {safeFormData.patient?.phonenumber || "N/A"}</h4>
            <h4>
              Notable Health Condition:{" "}
              {safeFormData.patient?.condition || "None"}
            </h4>
          </span>
        </div>

        <div className="mx-24">
          <h4>List of Prescribed Medication:</h4>
          {safeFormData.medications && safeFormData.medications.length > 0 ? (
            safeFormData.medications.map((med, index) => (
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
              {`${safeFormData.physician?.name?.first || "N/A"} ${
                safeFormData.physician?.name?.last || ""
              }`}
            </h4>
            <h4>Physician Signature</h4>
            {safeFormData.signature ? (
              <img
                src={safeFormData.signature}
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
              Physician Phone Number:{" "}
              {safeFormData.physician?.phonenumber || "N/A"}
            </h4>
          </span>
        </div>
        <hr className="mt-3 mb-4 mx-20" />
      </div>
    </div>
  );
};

// Define PropTypes for the component
ModalSubmit.propTypes = {
  formData: PropTypes.shape({
    prescriptionDate: PropTypes.string,
    patient: PropTypes.shape({
      name: PropTypes.shape({
        first: PropTypes.string,
        last: PropTypes.string,
      }),
      gender: PropTypes.string,
      age: PropTypes.number,
      phonenumber: PropTypes.string,
      allergies: PropTypes.string,
      condition: PropTypes.string,
    }),
    medications: PropTypes.arrayOf(
      PropTypes.shape({
        medicationName: PropTypes.string.isRequired,
        purpose: PropTypes.string.isRequired,
        dosage: PropTypes.string.isRequired,
        route: PropTypes.string.isRequired,
        frequency: PropTypes.string.isRequired,
      })
    ),
    physician: PropTypes.shape({
      name: PropTypes.shape({
        first: PropTypes.string,
        last: PropTypes.string,
      }),
      phonenumber: PropTypes.string,
    }),
    signature: PropTypes.string, // Add signature prop validation
  }),
};

export default ModalSubmit;
