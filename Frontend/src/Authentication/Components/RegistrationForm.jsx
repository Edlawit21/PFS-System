import { Form, Input, Radio, Select, Row, Col } from "antd";
import PropTypes from "prop-types";
import UploadButton from "./UploadButton";

const RegistrationForm = ({ form, onRoleChange }) => {
  const handleRoleChange = (value) => {
    // Call the callback with the selected role
    onRoleChange(value);
  };

  const handleFileChange = (fileList) => {
    // Update the form field value
    form.setFieldsValue({
      "profile-image": fileList,
    });
  };

  return (
    <div className="px-6">
      <h1 className="flex justify-center mb-4 font-medium">RegistrationForm</h1>
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
        <Form.Item
          label="Profile Image "
          name="profileImage"
          rules={[{ required: true, message: "Please upload your profile!" }]}
          layout="horizontal"
        >
          <UploadButton formType="registration" onChange={handleFileChange} />
        </Form.Item>
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
            <Radio value={1}>Male</Radio>
            <br />
            <Radio value={2}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Phone Number :"
          name="phonenumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input type="number" placeholder="(+251-900-000-000)" />
        </Form.Item>
        <Form.Item
          label="Role :"
          name="role"
          rules={[{ required: true, message: "Please Choose your role!" }]}
        >
          <Select
            placeholder="Select your role"
            onChange={handleRoleChange} // Update role on change
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
              <Input.Password />
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
};

export default RegistrationForm;
