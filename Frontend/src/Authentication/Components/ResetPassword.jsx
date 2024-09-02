import { Form, Input, Button } from "antd";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token"); // Extract token from URL

  const handleSubmit = async (values) => {
    try {
      await axios.post("/api/reset-password", {
        token,
        newPassword: values.newpassword,
        confirmPassword: values.confirmpassword,
      });
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Reset Password</h1>
      <h3>Set your new password</h3>
      <Form
        layout="vertical"
        requiredMark={false}
        style={{ width: "20rem" }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="New Password"
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input.Password placeholder="Create new password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmpassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newpassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "15px" }}
            htmlType="submit"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
