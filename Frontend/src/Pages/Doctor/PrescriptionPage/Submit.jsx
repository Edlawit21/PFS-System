import { useState } from "react";
import ModalSubmit from "./ModalSubmit";
import { Modal, Button, QRCode } from "antd";
import PropTypes from "prop-types";
import Pin from "./Pin";

const Submit = ({ isVisible, onClose, prescriptionId }) => {
  const [qrData, setQrData] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);

  // Function to reset modal state
  const resetModalState = () => {
    setShowQrCode(false);
    setQrGenerated(false);
    setShowPin(false);
  };

  // Handle Print button click
  const handlePrintClick = () => {
    setShowPin(true);
  };

  // Generate QR Code
  const generateQRCode = () => {
    setQrData(
      `http://localhost:3000/pharmacist/dashboard/prescription/${prescriptionId}`
    );
    setShowQrCode(true);
    setQrGenerated(true);
  };

  // Handle Edit button click
  const handleEditClick = () => {
    onClose();
    resetModalState(); // Reset modal state
  };

  return (
    <div className="w-full">
      <Modal
        className="submit-modal"
        footer={null}
        open={isVisible}
        onCancel={() => {
          onClose();
          resetModalState();
        }}
        centered
        width={900}
      >
        {showQrCode ? (
          <div className="flex justify-center pb-4">
            <QRCode value={qrData} size={400} />
          </div>
        ) : (
          <>
            {/* Pass prescriptionId from formData */}
            <ModalSubmit prescriptionId={prescriptionId} />
            <div className="flex justify-center gap-6 pb-4">
              <Button onClick={generateQRCode}>Generate QR Code</Button>
              <Button onClick={handleEditClick}>Edit</Button>
            </div>
          </>
        )}

        {qrGenerated && !showPin ? (
          <div className="flex justify-center">
            <Button
              style={{
                margin: "40px",
                width: "200px",
                backgroundColor: "#4d4dff",
                color: "white",
                fontWeight: "bold",
                fontSize: "large",
              }}
              onClick={handlePrintClick}
            >
              Print
            </Button>
          </div>
        ) : (
          showPin && (
            <div className="flex justify-center my-2">
              <Pin />
            </div>
          )
        )}
      </Modal>
    </div>
  );
};

// Define prop types for Submit component
Submit.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  prescriptionId: PropTypes.string.isRequired,
};

export default Submit;
