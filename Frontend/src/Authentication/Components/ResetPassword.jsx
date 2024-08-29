import { Form, Input, Button } from "antd";

const ResetPassword = () => {
  return (
    <div className="flex flex-col items-center">
      <h1>Reset Password</h1>
      <h3>Set your new password</h3>
      <Form layout="vertical" requiredMark={false} style={{ width: "20rem" }}>
        <Form.Item
          label="New Password"
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input your new password",
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
