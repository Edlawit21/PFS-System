import { Form, Input, Checkbox, Upload, Modal } from "antd";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const DocRegistration = ({ form }) => {
  const [eduFileList, setEduFileList] = useState([]);
  const [certFileList, setCertFileList] = useState([]);
  const [medLicenseFileList, setMedLicenseFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  // Validation messages for each file type
  const [eduValidationMessage, setEduValidationMessage] = useState("");
  const [certValidationMessage, setCertValidationMessage] = useState("");
  const [medLicenseValidationMessage, setMedLicenseValidationMessage] =
    useState("");

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
          // Include the actual file content (binary data)
          content: file.originFileObj,
        };
      }
      return file;
    });

    if (key === "edu") {
      setEduFileList(processedFileList);
      form.setFieldsValue({ educationalInfo: processedFileList });
    } else if (key === "cert") {
      setCertFileList(processedFileList);
      form.setFieldsValue({ certificate: processedFileList });
    } else if (key === "medLicense") {
      setMedLicenseFileList(processedFileList);
      form.setFieldsValue({ medicalLicense: processedFileList });
    }
  };

  // Validate file before uploading
  const beforeUpload = (key, file) => {
    const isSupportedType =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.name.endsWith(".docx");

    const isLessThanLimit = file.size / 1024 / 1024 < 10;

    if (!isSupportedType) {
      if (key === "edu") setEduValidationMessage("File type not supported.");
      else if (key === "cert")
        setCertValidationMessage("File type not supported.");
      else if (key === "medLicense")
        setMedLicenseValidationMessage("File type not supported.");
      return Upload.LIST_IGNORE;
    }

    if (!isLessThanLimit) {
      if (key === "edu") setEduValidationMessage("File size exceeds 10MB.");
      else if (key === "cert")
        setCertValidationMessage("File size exceeds 10MB.");
      else if (key === "medLicense")
        setMedLicenseValidationMessage("File size exceeds 10MB.");
      return Upload.LIST_IGNORE;
    }

    if (key === "edu") setEduValidationMessage("");
    else if (key === "cert") setCertValidationMessage("");
    else if (key === "medLicense") setMedLicenseValidationMessage("");

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
      <h1 className="flex justify-center mb-4 font-medium">Doc Registration</h1>
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label="Doctor Name :"
          name="docName"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Dr. Name" />
        </Form.Item>

        {/* Educational Info Upload (Required) */}
        <Form.Item
          label="Educational Info :"
          name="educationalInfo"
          rules={[
            { required: true, message: "Please upload your educational info!" },
          ]}
          help={eduValidationMessage}
          validateStatus={eduValidationMessage ? "error" : ""}
        >
          <Upload
            customRequest={customRequest}
            listType="picture"
            fileList={eduFileList}
            onPreview={handlePreview}
            onChange={(fileList) => handleChange("edu", fileList)}
            beforeUpload={(file) => {
              setEduFileList([file]); // Store only one file, or adjust for multiple
              return false; // Prevent automatic upload
            }}
          >
            {eduFileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Hospital Name :"
          name="hospitalName"
          rules={[
            { required: true, message: "Please input your hospital name!" },
          ]}
        >
          <Input placeholder="Hospital name" />
        </Form.Item>

        <Form.Item
          label="Hospital Type :"
          name="hospitalType"
          rules={[
            { required: true, message: "Please choose a hospital type!" },
          ]}
        >
          <Checkbox.Group>
            <div className="flex justify-around">
              <Checkbox value="Private">Private</Checkbox>
              <Checkbox value="Public">Public</Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Specialization (if any) :" name="specialization">
          <Input placeholder="Specialization" />
        </Form.Item>

        {/* Certificate Upload (Optional) */}
        <Form.Item
          label="Certificate (if any) :"
          name="certificate"
          help={certValidationMessage}
          validateStatus={certValidationMessage ? "error" : ""}
        >
          <Upload
            customRequest={customRequest}
            listType="picture"
            fileList={certFileList}
            onPreview={handlePreview}
            onChange={(fileList) => handleChange("cert", fileList)}
            beforeUpload={(file) => {
              setCertFileList([file]);
              return false; // Prevent automatic upload
            }}
          >
            {certFileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Experience :"
          name="experience"
          rules={[{ required: true, message: "Please fill this field!" }]}
        >
          <Input type="number" placeholder="Enter your experience" />
        </Form.Item>

        {/* Medical License Upload (Required) */}
        <Form.Item
          label="Medical License :"
          name="medicalLicense"
          rules={[
            { required: true, message: "Please upload your medical license!" },
          ]}
          help={medLicenseValidationMessage}
          validateStatus={medLicenseValidationMessage ? "error" : ""}
        >
          <Upload
            customRequest={customRequest}
            listType="picture"
            fileList={medLicenseFileList}
            onPreview={handlePreview}
            onChange={(fileList) => handleChange("medLicense", fileList)}
            beforeUpload={(file) => {
              setMedLicenseFileList([file]);
              return false;
            }}
          >
            {medLicenseFileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Set Your Pin:"
          name="pin"
          rules={[{ required: true, message: "Please set a pin!" }]}
        >
          <Input.Password placeholder="Enter a secure pin" />
        </Form.Item>

        <Form.Item
          label="Confirm Pin:"
          name="confirmPin"
          dependencies={["pin"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your pin!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("pin") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two pins do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your pin" />
        </Form.Item>
      </Form>
      <Modal
        visible={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

DocRegistration.propTypes = {
  form: PropTypes.object.isRequired,
};

export default DocRegistration;
