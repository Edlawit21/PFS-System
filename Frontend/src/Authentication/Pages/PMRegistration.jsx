import { Form, Input } from "antd";
import PropTypes from "prop-types";
import UploadButton from "../Components/UploadButton";

const PMRegistration = ({ form }) => {
  return (
    <div className="px-6">
      <h1 className="flex justify-center mb-4 font-medium">PMregistration</h1>
      <Form layout="vertical" form={form} requiredMark={false}>
        <Form.Item
          label="PharmacyManager Name :"
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
          <Input placeholder="Name of pharmacy :" />
        </Form.Item>
        <Form.Item
          label="License Information : "
          name="licensePM"
          rules={[{ required: true, message: "Please upload your license!" }]}
        >
          <UploadButton formType="pmanager" />
        </Form.Item>
        <Form.Item
          label="Business Registration : "
          name="businessR"
          rules={[
            {
              required: true,
              message: "Please upload your business registration!",
            },
          ]}
        >
          <UploadButton formType="pmanager" />
        </Form.Item>
        <Form.Item
          label="Compliance Certificates : "
          name="compliance"
          rules={[
            {
              required: true,
              message: "Please upload your compliance certificate!",
            },
          ]}
        >
          <UploadButton formType="pmanager" />
        </Form.Item>
        <Form.Item label=" Experience(optional) : " name="experience">
          <Input placeholder="0-10 years" />
        </Form.Item>
      </Form>
    </div>
  );
};

PMRegistration.propTypes = {
  form: PropTypes.object.isRequired,
};

export default PMRegistration;
