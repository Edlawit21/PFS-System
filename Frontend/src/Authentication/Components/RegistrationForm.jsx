import { Form, Input, Radio, Select, Row, Col } from "antd";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import { useState } from "react";

const RegistrationForm = ({ form, onRoleChange, onChange }) => {
  {
    /*const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onChange) {
      onChange(newFileList); // Pass updated fileList to parent component
    }
    if (newFileList.length === 0) {
      setValidationMessage("Please upload your profile image!"); // Set validation message if no files
    } else {
      setValidationMessage(""); // Clear message if files are present
    }
  };

  const beforeUpload = (file) => {
    const isSupportedType =
      file.type === "image/png" || file.type === "image/jpeg";
    const isLessThanLimit = file.size / 1024 / 1024 < 5;

    if (!isSupportedType) {
      setValidationMessage(
        "File type not supported. Only PNG and JPEG are allowed."
      );
      return Upload.LIST_IGNORE; // Ignore this file
    }

    if (!isLessThanLimit) {
      setValidationMessage("File size exceeds 5MB.");
      return Upload.LIST_IGNORE; // Ignore this file
    }

    setValidationMessage(""); // Clear validation message
    return true; // Allow upload
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      setValidationMessage(`${file.name} uploaded successfully.`);
      // Set the profileImage field value to the actual File object
      form.setFieldsValue({
        profileImage: file, // Set the profile image to the File object
      });
      onSuccess("ok");
    }, 0);
  };

  const uploadButton = (
    <button type="button" className="border rounded-md w-40 p-1">
      <PlusOutlined />
      <div>Upload</div>
    </button>
  );*/
  }

  const handleRoleChange = (value) => {
    onRoleChange(value);
  };

  return (
    <div className="px-6">
      <h1 className="flex justify-center mb-4 font-medium">
        Registration Form
      </h1>
      <Form layout="vertical" form={form} requiredMark={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Firstname :"
              name="firstname"
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
            >
              <Input placeholder="Firstname" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Lastname :"
              name="lastname"
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input placeholder="Lastname" allowClear />
            </Form.Item>
          </Col>
        </Row>
        {/* <Form.Item
          label="Profile Image :"
          name="profileImage"
          rules={[
            { required: true, message: "Please upload your profile image!" },
          ]}
        >
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
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
              style={{ display: previewImage ? "block" : "none" }} // Show the preview image only when available
            />
            {validationMessage && (
              <div
                style={{
                  color: validationMessage.includes("successfully")
                    ? "green"
                    : "red",
                  marginTop: 8,
                }}
              >
                {validationMessage}
              </div>
            )}
          </div>
        </Form.Item> */}

        <Form.Item
          label="Username :"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" allowClear />
        </Form.Item>
        <Form.Item
          label="Email :"
          name="email"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your E-mail!" },
          ]}
        >
          <Input placeholder="Enter your email address" allowClear />
        </Form.Item>
        <Form.Item
          label="Gender :"
          name="gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Radio.Group
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Phone Number :"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="(+251-900-000-000)" />
        </Form.Item>
        <Form.Item
          label="Role :"
          name="role"
          rules={[{ required: true, message: "Please choose your role!" }]}
        >
          <Select
            placeholder="Select your role"
            onChange={handleRoleChange}
            options={[
              { value: "doctor", label: "Doctor" },
              { value: "pharmacyManager", label: "Pharmacy Manager" },
            ]}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password :"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirm"
              label="Confirm Password :"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

RegistrationForm.propTypes = {
  form: PropTypes.object.isRequired,
  onRoleChange: PropTypes.func.isRequired,
  onChange: PropTypes.func, // onChange is optional now
};

export default RegistrationForm;
