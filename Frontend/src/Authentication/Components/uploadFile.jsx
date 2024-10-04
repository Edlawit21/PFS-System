{
  /*// FileUpload.jsx
import { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType === "application/pdf") {
        const pdfUrl = URL.createObjectURL(selectedFile);
        setFilePreview(pdfUrl);
        setFileType("pdf");
      } else if (
        fileType === "application/vnd.ms-powerpoint" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        const pptUrl = URL.createObjectURL(selectedFile);
        setFilePreview(pptUrl);
        setFileType("ppt");
      } else if (
        fileType === "application/msword" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const docUrl = URL.createObjectURL(selectedFile);
        setFilePreview(docUrl);
        setFileType("doc");
      } else {
        setFilePreview(null);
        setFileType("");
      }
    } else {
      setFilePreview(null);
      setFileType("");
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await Api.post("/upload-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File upload response:", response.data);
      alert("File uploaded successfully");

      // Reset the form
      setFile(null);
      setFilePreview(null);
      setFileType("");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="relative max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
      <form onSubmit={handleFileSubmit}>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        {filePreview && (
          <div className="mb-4">
            {fileType === "pdf" ? (
              <iframe
                src={filePreview}
                title="PDF Preview"
                className="w-full h-64 border border-gray-300 rounded"
              ></iframe>
            ) : fileType === "ppt" || fileType === "doc" ? (
              <div>
                <a
                  href={filePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View {fileType === "ppt" ? "PowerPoint" : "Document"}
                </a>
              </div>
            ) : null}
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
*/
}

// FileUpload.jsx
import { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType === "application/pdf") {
        const pdfUrl = URL.createObjectURL(selectedFile);
        setFilePreview(pdfUrl);
        setFileType("pdf");
      } else if (
        fileType === "application/vnd.ms-powerpoint" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        const pptUrl = URL.createObjectURL(selectedFile);
        setFilePreview(pptUrl);
        setFileType("ppt");
      } else if (
        fileType === "application/msword" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const docUrl = URL.createObjectURL(selectedFile);
        setFilePreview(docUrl);
        setFileType("doc");
      } else {
        setFilePreview(null);
        setFileType("");
      }
    } else {
      setFilePreview(null);
      setFileType("");
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    // Display an alert or message indicating the file is ready to be uploaded
    alert(`File "${file.name}" is ready to be uploaded.`);

    // Reset the form
    setFile(null);
    setFilePreview(null);
    setFileType("");
  };

  return (
    <div className="relative max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
      <form onSubmit={handleFileSubmit}>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        {filePreview && (
          <div className="mb-4">
            {fileType === "pdf" ? (
              <iframe
                src={filePreview}
                title="PDF Preview"
                className="w-full h-64 border border-gray-300 rounded"
              ></iframe>
            ) : fileType === "ppt" || fileType === "doc" ? (
              <div>
                <a
                  href={filePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View {fileType === "ppt" ? "PowerPoint" : "Document"}
                </a>
              </div>
            ) : null}
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
