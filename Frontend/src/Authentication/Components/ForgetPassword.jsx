import { Button, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const ForgetPassword = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-6">Forget Password</h1>
      <Form
        requiredMark={false}
        name="forget-password-form"
        layout="vertical"
        style={{ width: "20rem", margin: "auto" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "15px" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className=" mt-44 ml-[-400px]">
        <Button
          type="link"
          onClick={onBack}
          style={{ color: "grey", fontSize: "large" }}
        >
          <ArrowLeftOutlined />
          Go Back
        </Button>
      </div>
    </div>
  );
};

ForgetPassword.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default ForgetPassword;
