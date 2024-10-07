import { useEffect, useState } from "react";
import { Divider } from "antd";
import Api from "../../../api/axiosInstance"; // Import your Axios instance
import { useParams } from "react-router";

const PrescriptionQrScand = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const { qr } = useParams();
  console.log(qr);

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
        const response = await Api.get(`/prescription/${qr}`);
        console.log("pres log", response.data);

        setFormData(response.data); // Set the fetched data
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request completes
      }
    };
    fetchPrescriptionData();
  }, [qr]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  // Check if formData is null or empty
  if (
    !formData ||
    (Array.isArray(formData.medications) && formData.medications.length === 0)
  ) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Prescription Not Found
        </h1>
        <Divider style={{ borderColor: "#e0e0e0", borderWidth: "1px" }} />
        <p className="text-center">
          No prescription data available for the provided QR code.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Prescription</h1>
      <Divider style={{ borderColor: "#e0e0e0", borderWidth: "1px" }} />

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
            <span className="font-normal">{`${
              formData.patient?.name?.first || "N/A"
            } ${formData.patient?.name?.last || ""}`}</span>
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
        {formData.medications && formData.medications.length > 0 ? (
          formData.medications.map((med, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg mb-2 shadow-sm"
            >
              <h4 className="font-medium">
                Medication Name:{" "}
                <span className="font-normal">{med.medicationName}</span>
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
          ))
        ) : (
          <h4 className="text-red-600">No medications prescribed.</h4>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium">
            Physician Name:{" "}
            <span className="font-normal">{`${
              formData.physician?.name?.first || "N/A"
            } ${formData.physician?.name?.last || ""}`}</span>
          </h4>
          <h4 className="font-medium">Physician Signature</h4>
          {formData.signature ? (
            <img
              src={formData.signature}
              alt="Physician Signature"
              className="w-48 h-auto border border-gray-200 rounded mt-2"
            />
          ) : (
            <h4 className="font-normal">No signature available.</h4>
          )}
        </div>
        <div>
          <h4 className="font-medium">
            Physician Phone Number:{" "}
            <span className="font-normal">
              {formData.physician?.phonenumber || "N/A"}
            </span>
          </h4>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  );
};

export default PrescriptionQrScand;
