import "./App.css";
import LoginForm from "./Authentication/Pages/LoginForm";
//import UploadButton from "./Authentication/Components/UploadButton";
import ForgetPassword from "./Authentication/Components/ForgetPassword";
//import LoginForm from "./Authentication/Pages/LoginForm";
//import RegistrationForm from "./Authentication/Components/RegistrationForm";
import RegistrationPage from "./Authentication/Pages/RegistrationPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Dashboard from "./Pages/Pharmacist/Dashboard";
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
