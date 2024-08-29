import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const Scan = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    // Function to handle success
    function onScanSuccess(result) {
      scanner.clear();
      setScanResult(result);
    }

    // Function to handle errors
    function onScanError(error) {
      console.warn("QR Code scanning error:", error);
    }

    // Render the scanner
    scanner.render(onScanSuccess, onScanError);

    // Cleanup on component unmount
    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className=" ">
      <h1 className="mb-6">QR Code Scanning</h1>
      {scanResult ? (
        <div className="bg-white flex justify-center ">
          Success: <a href={scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader" className="bg-white w-full h-full "></div>
      )}
    </div>
  );
};

export default Scan;
