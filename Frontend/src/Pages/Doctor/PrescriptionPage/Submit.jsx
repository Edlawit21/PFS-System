import { useState } from "react";
import ModalSubmit from "./ModalSubmit";
import { Modal, Button, QRCode } from "antd";
import Pin from "./Pin";

const Submit = () => {
  const [open, setOpen] = useState(false);
  const [qrData, setQrData] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [showPin, setShowPin] = useState(false); // State to toggle visibility
  const [qrGenerated, setQrGenerated] = useState(false); // New state to track QR code generation

  const showModal = () => {
    setOpen(true);
    setShowQrCode(false); // Reset the state when the modal is reopened
    setQrGenerated(false); // Reset QR code generation state
    setShowPin(false);
  };

  const handlePrintClick = () => {
    setShowPin(true); // Set to true to show the Pin component
  };

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
    setShowQrCode(true); // Show the QR code
    setQrGenerated(true); // Set to true to show the Print button
  };
  const handleEditClick = () => {
    setShowQrCode(false); // Hide QR code
    setQrGenerated(false); // Hide Print button
    setShowPin(false); // Hide Pin component
    setOpen(false);
  };

  return (
    <div className="w-full">
      <Button
        size="large"
        style={{
          margin: "40px",
          width: "200px",
          backgroundColor: "#4d4dff",
          color: "white",
          fontWeight: "bold",
          fontSize: "large",
        }}
        onClick={showModal}
      >
        Submit
      </Button>
      <Modal
        className="submit-modal"
        footer={null}
        open={open}
        onCancel={() => setOpen(false)}
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

        {qrGenerated && !showPin ? ( // Show Print button only if QR code is generated and Pin is not shown
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
          ) // Render the Pin component when showPin is true
        )}
      </Modal>
    </div>
  );
};

export default Submit;
