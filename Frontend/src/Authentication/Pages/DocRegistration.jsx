import { Form, Input, Checkbox } from "antd";
import PropTypes from "prop-types";
import UploadButton from "../Components/UploadButton";

const DocRegistration = ({ form }) => {
  return (
    <div className="px-6">
      <h1 className="flex justify-center mb-4 font-medium">DocRegistration</h1>
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label="Doctor Name :"
          name="docname"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Dr.Name" />
        </Form.Item>
        <Form.Item
          label="Educational Info :"
          name="educationalInfo"
          rules={[
            { required: true, message: "Please upload your educationalInfo!" },
          ]}
        >
          <UploadButton formType="doc" />
        </Form.Item>
        <Form.Item
          label="Hospital Name :"
          name="hospitalname"
          rules={[
            { required: true, message: "Please input your hospitalname!" },
          ]}
        >
          <Input placeholder="Hospital name" />
        </Form.Item>
        <Form.Item
          label="Hospital Type :"
          name="hospitaltype"
          rules={[{ required: true, message: "Please choose!" }]}
        >
          <div className="w- flex justify-around">
            <Checkbox value="A">Private</Checkbox>
            <Checkbox value="B">Public</Checkbox>
          </div>
        </Form.Item>
        <Form.Item label="Specialization(if any) :" name="specialization">
          <Input placeholder="Specialization" />
        </Form.Item>
        <Form.Item label="Certificate(if any) :" name="certificate">
          <UploadButton formType="doc" />
        </Form.Item>
        <Form.Item
          label="Experience :"
          name="experience"
          rules={[{ required: true, message: "Please fill this filled!" }]}
        >
          <Input placeholder="Enter your experience" />
        </Form.Item>
        <Form.Item
          label="Medical License :"
          name="medLicense"
          rules={[
            { required: true, message: "Please enter your medical License!" },
          ]}
        >
          <UploadButton formType="doc" />
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
    </div>
  );
};

DocRegistration.propTypes = {
  form: PropTypes.object.isRequired, // Ensure form is passed and is an object
};

export default DocRegistration;
