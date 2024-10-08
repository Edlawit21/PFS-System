import { Button, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import Api from "../../api/axiosInstance";

const LoginForm = ({ onForgetPassword, onBack }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleFinish = async (values) => {
    const { username, password } = values;

    try {
      // Send login request to the backend
      const response = await Api.post(
        "/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      // Log the response data to see what's returned
      console.log("Response data:", response.data);

      // Destructure user, role, and token from the response
      const { user, token } = response.data; // Extract token and user object
      // Ensure that the user object and token are present
      if (!user || !token) {
        throw new Error("Invalid response structure");
      }

      const { role } = user; // Extract role from the user object

      // Log extracted values for debugging
      console.log("Role:", role);
      console.log("Token:", token);

      // Store the token and user data in Zustand and localStorage
      setUser(user.username, role, token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      // Redirect based on role
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "pharmacyManager":
          navigate("/pmanager/dashboard");
          break;
        case "pharmacist":
          navigate("/pharmacist/dashboard");
          break;
        default:
          navigate("/login");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., show error message)
      form.setFields([
        {
          name: "username",
          errors: ["Invalid credential"],
        },
        {
          name: "password",
          errors: ["Invalid credential"],
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-6 font-medium">Sign In</h1>
      <Form
        form={form}
        requiredMark={false}
        name="form"
        layout="vertical"
        onFinish={handleFinish}
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
            style={{ width: "100%", marginTop: "15px", color: "white" }}
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
