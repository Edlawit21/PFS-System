import { useState } from "react";
import { QRCode, Button } from "antd";
import PropTypes from "prop-types";

const GenerateQR = ({ prescriptionId }) => {
  const [qrData, setQrData] = useState("");

  const generateQRCode = () => {
    setQrData("http://localhost/prescription/qr/" + prescriptionId);
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
  prescriptionId: PropTypes.string.isRequired,
};

export default GenerateQR;
