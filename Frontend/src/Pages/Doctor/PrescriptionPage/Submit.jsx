import { useState } from "react";
import ModalSubmit from "./ModalSubmit";
import { Modal, Button, QRCode } from "antd";
import PropTypes from "prop-types";
import Pin from "./Pin";

const Submit = ({ isVisible, onClose }) => {
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
    const formData = {
      prescriptionNo: "12345",
      prescriptionDate: "2024-07-25",
      patientInfo: {
        name: "John Doe",
        gender: "Male",
        allergies: "None",
        age: 30,
        phoneNumber: "123-456-7890",
        notableHealthCondition: "None",
      },
      physicianInfo: {
        name: "Dr. Smith",
        signature: "Signature",
        phoneNumber: "098-765-4321",
      },
      prescribedMedication: "Medication List",
    };

    const qrCodeString = JSON.stringify(formData);
    setQrData(qrCodeString);
    setShowQrCode(true);
    setQrGenerated(true);
  };

  // Handle Edit button click
  const handleEditClick = () => {
    // Close the modal when Edit is clicked
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
          onClose(); // Ensure parent component closes modal
          resetModalState(); // Reset modal state when closed
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
            <ModalSubmit />
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

// Define prop types for the component
Submit.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Submit;
