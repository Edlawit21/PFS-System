{
  /*import { Html5QrcodeScanner } from "html5-qrcode";
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
*/
}

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

// Import useNavigate

const Scan = () => {
  console.log("Scan component rendered");
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null); // Hold the scanner instance

  useEffect(() => {
    const html5QrCodeScanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    setScanner(html5QrCodeScanner); // Save scanner instance

    return () => {
      if (html5QrCodeScanner) {
        html5QrCodeScanner.clear();
      }
    };
  }, []);

  const startScan = () => {
    if (scanner) {
      scanner.render(
        (result) => {
          console.log("Scan success:", result);
          setScanResult(result);
          scanner.clear(); // Clear scanner after successful scan
          // Use window.location.href to navigate to the full URL
          window.location.href = result; // Redirect to the scanned URL
        },

        (error) => {
          console.warn("Scan error:", error);
        }
      );
    } else {
      console.error("Scanner not initialized");
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6">QR Code Scanning</h1>
      {scanResult ? (
        <div className="bg-white flex justify-center p-4">
          Success: <a href={scanResult}>{scanResult}</a>
        </div>
      ) : (
        <>
          <div id="reader" style={{ width: "300px", height: "300px" }}></div>
          <button
            className="mt-4 p-2 bg-blue-500 text-white"
            onClick={startScan}
          >
            Start Scan
          </button>
        </>
      )}
    </div>
  );
};

export default Scan;
