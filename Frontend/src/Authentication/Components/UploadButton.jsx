{
  /*import { PlusOutlined } from "@ant-design/icons";
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
      const fileURL = URL.createObjectURL(file.originFileObj);
      window.open(fileURL);
    } else {
      setPreviewImage(file.url || file.thumbUrl);
      setPreviewOpen(true);
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    if (onChange) {
      onChange(fileList);
    }
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

    const isLessThanLimit =
      formType === "registration"
        ? file.size / 1024 / 1024 < 5 // for images
        : file.size / 1024 / 1024 < 10; // for documents

    if (!isSupportedType) {
      setValidationMessage("File type not supported.");
      return Upload.LIST_IGNORE;
    }

    if (!isLessThanLimit) {
      setValidationMessage(
        `File size exceeds ${formType === "registration" ? "5MB" : "10MB"}.`
      );
      return Upload.LIST_IGNORE;
    }

    setValidationMessage("");
    return true;
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      setValidationMessage(`${file.name} uploaded successfully.`);
    }, 0);
  };

  const uploadButton = (
    <button type="button" className="border rounded-md w-40 p-1">
      <PlusOutlined />
      <div>Upload</div>
    </button>
  );

  return (
    <div>
      <Upload
        customRequest={customRequest}
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
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
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

export default UploadButton;*/
}

{
  /*import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd"; // Ensure to import Image from antd
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
      const fileURL = URL.createObjectURL(file.originFileObj);
      window.open(fileURL);
    } else {
      setPreviewImage(file.url || file.thumbUrl);
      setPreviewOpen(true);
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    if (onChange) {
      onChange(fileList);
    }
    if (fileList.length === 0) {
      setValidationMessage("");
    }
  };

  const beforeUpload = (file) => {
    const isSupportedType =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.name.endsWith(".docx");

    const isLessThanLimit = file.size / 1024 / 1024 < 10; // for documents

    if (!isSupportedType) {
      setValidationMessage("File type not supported.");
      return Upload.LIST_IGNORE;
    }

    if (!isLessThanLimit) {
      setValidationMessage("File size exceeds 10MB.");
      return Upload.LIST_IGNORE;
    }

    setValidationMessage("");
    return true;
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      setValidationMessage(`${file.name} uploaded successfully.`);
    }, 0);
  };

  const uploadButton = (
    <button type="button" className="border rounded-md w-40 p-1">
      <PlusOutlined />
      <div>Upload</div>
    </button>
  );

  return (
    <div>
      <Upload
        customRequest={customRequest}
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
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
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

export default UploadButton;*/
}

import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";

const UploadButton = ({ onChange }) => {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handlePreview = async (file) => {
    // Preview the image when clicked
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    if (onChange) {
      onChange(fileList);
    }
    if (fileList.length === 0) {
      setValidationMessage("");
    }
  };

  const beforeUpload = (file) => {
    // Only accept PNG and JPEG images
    const isSupportedType =
      file.type === "image/png" || file.type === "image/jpeg";

    // Limit image size to 5MB
    const isLessThanLimit = file.size / 1024 / 1024 < 5;

    if (!isSupportedType) {
      setValidationMessage(
        "File type not supported. Only PNG and JPEG are allowed."
      );
      return Upload.LIST_IGNORE;
    }

    if (!isLessThanLimit) {
      setValidationMessage("File size exceeds 5MB.");
      return Upload.LIST_IGNORE;
    }

    setValidationMessage("");
    return true;
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      setValidationMessage(`${file.name} uploaded successfully.`);
    }, 0);
  };

  const uploadButton = (
    <button type="button" className="border rounded-md w-40 p-1">
      <PlusOutlined />
      <div>Upload</div>
    </button>
  );

  return (
    <div>
      <Upload
        customRequest={customRequest}
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
          wrapperStyle={{ display: "none" }} // Hide the wrapper style
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
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
  onChange: PropTypes.func,
};

export default UploadButton;
