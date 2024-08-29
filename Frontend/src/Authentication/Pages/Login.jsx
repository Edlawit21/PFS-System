import { Input, Form, Button } from "antd";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Form requiredMark={false}>
        <Form.Item
          label="Username"
          name="username "
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" allowClear />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <div className="flex justify-center">
          <Button htmlType="submit">SignIn</Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
