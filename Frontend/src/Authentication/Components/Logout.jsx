import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";

const LogoutButton = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login"); // Redirect to login page after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
