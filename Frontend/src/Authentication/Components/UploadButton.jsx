import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";

const UploadButton = ({ formType, onChange }) => {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handlePreview = async (file) => {
    if (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.name.endsWith(".docx")
    ) {
      // For PDFs and DOC files, open in a new tab
      const fileURL = URL.createObjectURL(file.originFileObj);
      window.open(fileURL);
    } else {
      // For images, show the preview modal
      setPreviewImage(file.url || file.thumbUrl);
      setPreviewOpen(true);
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);

    // Update form value
    if (onChange) {
      onChange(fileList);
    }

    // Clear the validation message if all files are removed
    if (fileList.length === 0) {
      setValidationMessage("");
    }
  };

  const beforeUpload = (file) => {
    const isSupportedType =
      (formType === "registration" &&
        (file.type === "image/png" || file.type === "image/jpeg")) ||
      (formType !== "registration" &&
        (file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.name.endsWith(".docx")));

    const isLessThan1000MB = file.size / 1024 / 1024 < 1000;

    if (!isSupportedType) {
      setValidationMessage(
        "File type not supported. Only PDF or Doc. file types are allowed."
      );
      return Upload.LIST_IGNORE;
    }

    if (!isLessThan1000MB) {
      setValidationMessage("File size exceeds 1000MB.");
      return Upload.LIST_IGNORE;
    }

    setValidationMessage(""); // Clear the validation message if the file is valid
    return true;
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok"); // Simulate successful upload
      setValidationMessage(`${file.name} uploaded successfully.`);
    }, 0);
  };

  const uploadButton = (
    <button type="button" className="border rounded-md w-40 p-1">
      <PlusOutlined />
      <div className="">Upload</div>
    </button>
  );

  return (
    <div>
      <Upload
        customRequest={customRequest} // Use customRequest to handle the upload manually
        listType="picture"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      {/* Display the validation message below the Upload component */}
      {validationMessage && (
        <div
          style={{
            color: validationMessage.includes("successfully") ? "green" : "red",
            marginTop: 8,
          }}
        >
          {validationMessage}
        </div>
      )}
    </div>
  );
};

UploadButton.propTypes = {
  formType: PropTypes.oneOf(["registration", "doc", "pmanager"]).isRequired,
  onChange: PropTypes.func,
};

export default UploadButton;
