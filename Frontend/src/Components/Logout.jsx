import { Button } from "antd";
import Api from "../api/axiosInstance";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await Api.post("/logout");
      // Clear the token from localStorage
      // Clear the token from localStorage
      localStorage.removeItem("token");

      // Optionally, you can redirect to the login page after logout
      window.location.href = "/"; // Redirect to the login page
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.msg || "Logout failed."
      );
    }
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
