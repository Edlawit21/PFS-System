import "./App.css";
import LoginForm from "./Authentication/Pages/LoginForm";
//import UploadButton from "./Authentication/Components/UploadButton";
//import RegistrationForm from "./Authentication/Components/RegistrationForm";
//import RegistrationPage from "./Authentication/Pages/RegistrationPage";
import AdminDashboard from "./Pages/Admin/Dashboard";
import PMDashboard from "./Pages/PharmacyManager/Dashboard";
import PrescriptionForm from "./Pages/Doctor/PrescriptionPage/PrescriptionForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PharmacistDashboard from "./Pages/Pharmacist/Dashboard";
//import PrescriptionForm from "./Pages/Doctor/PrescriptionPage/PrescriptionForm";
//import Dashboard from "./Pages/Pharmacist/Dashboard";
//import useUserStore from "./store/userStore";
//import { Navigate } from "react-router-dom";
import RegistrationPage from "./Authentication/Pages/RegPage";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />

          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          <Route path="/doctor/dashboard" element={<PrescriptionForm />} />
          <Route path="/pmanager/dashboard/*" element={<PMDashboard />} />
          <Route
            path="/pharmacist/dashboard/*"
            element={<PharmacistDashboard />}
          />
        </Routes>
      </Router>
      {/*<PrescriptionForm />*/}
    </div>
  );
}

export default App;
