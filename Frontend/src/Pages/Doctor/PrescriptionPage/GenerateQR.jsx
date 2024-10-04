import { useState } from "react";
import { QRCode, Button } from "antd";
import PropTypes from "prop-types";

const GenerateQR = ({ formData }) => {
  const [qrData, setQrData] = useState("");

  const generateQRCode = () => {
    const qrCodeString = JSON.stringify(formData);
    setQrData(qrCodeString);
  };

  return (
    <div className="flex justify-center">
      <Button onClick={generateQRCode}>Generate QR Code</Button>
      {qrData && (
        <div className="flex justify-center pb-4">
          <QRCode value={qrData} />
        </div>
      )}
    </div>
  );
};

// Define PropTypes for the component
GenerateQR.propTypes = {
  formData: PropTypes.shape({
    prescriptionDate: PropTypes.string,
    patient: PropTypes.shape({
      name: PropTypes.string,
    }),
    gender: PropTypes.number,
    allergies: PropTypes.string,
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
      name: PropTypes.string,
    }),
    physicianPhonenumber: PropTypes.string,
  }).isRequired, // Marking formData as required
};

export default GenerateQR;
