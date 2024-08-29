import { Button, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PropTypes from 'prop-types'; 

const LoginForm = ({ onForgetPassword, onBack }) => {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-6 font-medium">Sign In</h1>
      <Form
        requiredMark={false}
        name="form"
        layout="vertical"
        style={{ width: "20rem", margin: "auto" }}
      >
        <Form.Item
          label="Username :"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password :"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="link"
            onClick={onForgetPassword}
            style={{ color: "blue" }}
          >
            Forget Password?
          </Button>
        </div>
        <Form.Item>
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "15px" }}
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className=" mt-14 ml-[-400px]">
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

LoginForm.propTypes = {
  onForgetPassword: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default LoginForm;
