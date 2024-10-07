import { Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useState } from "react";

const PMRegistration = ({ form }) => {
  const [licFileList, setLicFileList] = useState([]);
  const [compFileList, setCompFileList] = useState([]);
  const [busFileList, setBusFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  // Preview file handler
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

  // Handle file change and set actual file content in the form
  const handleChange = (key, { fileList }) => {
    const processedFileList = fileList.map((file) => {
      if (file.originFileObj) {
        return {
          ...file,
          content: file.originFileObj,
        };
      }
      return file;
    });

    if (key === "lic") {
      setLicFileList(processedFileList);
      form.setFieldsValue({ licensePM: processedFileList });
    } else if (key === "comp") {
      setCompFileList(processedFileList);
      form.setFieldsValue({ compliance: processedFileList });
    } else if (key === "bus") {
      setBusFileList(processedFileList);
      form.setFieldsValue({ businessR: processedFileList });
    }
  };

  // Validate file before uploading
  const beforeUpload = (file) => {
    const isSupportedType =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.name.endsWith(".docx");

    const isLessThanLimit = file.size / 1024 / 1024 < 10;

    if (!isSupportedType) {
      form.setFields([
        {
          name: "licensePM",
          errors: ["You can only upload PDF, DOC, or DOCX files."],
        },
      ]);
      return false;
    }

    if (!isLessThanLimit) {
      form.setFields([
        {
          name: "licensePM",
          errors: ["File size cannot exceed 10MB."],
        },
      ]);
      return false;
    }

    return true;
  };

  // Simulate custom request
  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // Upload button
  const uploadButton = (
    <button type="button" className="border rounded-md w-40 p-1">
      <PlusOutlined />
      <div>Upload</div>
    </button>
  );

  return (
    <div className="px-6">
      <h1 className="flex justify-center mb-4 font-medium">PM Registration</h1>
      <Form layout="vertical" form={form} requiredMark={false}>
        <Form.Item
          label="Pharmacy Manager Name :"
          name="pmName"
          rules={[{ required: true, message: "Enter your name!" }]}
        >
          <Input placeholder="Owner name" />
        </Form.Item>

        <Form.Item
          label="Pharmacy Name :"
          name="pharmaName"
          rules={[
            { required: true, message: "Please input the pharmacy name!" },
          ]}
        >
          <Input placeholder="Name of pharmacy" />
        </Form.Item>

        <Form.Item
          label="License Information :"
          name="licensePM"
          rules={[{ required: true, message: "Please upload your license!" }]}
        >
          <Upload
            customRequest={customRequest}
            listType="picture"
            fileList={licFileList}
            onPreview={handlePreview}
            onChange={(fileList) => handleChange("lic", fileList)}
            beforeUpload={beforeUpload}
          >
            {licFileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Business Registration :"
          name="businessR"
          rules={[
            {
              required: true,
              message: "Please upload your business registration!",
            },
          ]}
        >
          <Upload
            customRequest={customRequest}
            listType="picture"
            fileList={busFileList}
            onPreview={handlePreview}
            onChange={(fileList) => handleChange("bus", fileList)}
            beforeUpload={beforeUpload}
          >
            {busFileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Compliance Certificates :"
          name="compliance"
          rules={[
            {
              required: true,
              message: "Please upload your compliance certificate!",
            },
          ]}
        >
          <Upload
            customRequest={customRequest}
            listType="picture"
            fileList={compFileList}
            onPreview={handlePreview}
            onChange={(fileList) => handleChange("comp", fileList)}
            beforeUpload={beforeUpload}
          >
            {compFileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item label="Experience (optional) :" name="experience">
          <Input type="number" placeholder="0-10 years" />
        </Form.Item>
      </Form>
    </div>
  );
};

PMRegistration.propTypes = {
  form: PropTypes.object.isRequired,
};

export default PMRegistration;
