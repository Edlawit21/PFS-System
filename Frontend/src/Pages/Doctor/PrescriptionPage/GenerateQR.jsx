import { useState } from "react";
import { QRCode, Button } from "antd";

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

export default GenerateQR;
