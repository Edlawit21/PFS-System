import "./App.css";
import AdminDashboard from "./Pages/Admin/Dashboard";
import PMDashboard from "./Pages/PharmacyManager/Dashboard";
import PrescriptionForm from "./Pages/Doctor/PrescriptionPage/PrescriptionForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PharmacistDashboard from "./Pages/Pharmacist/Dashboard";
import RegistrationPage from "./Authentication/Pages/RegPage";
import PrescriptionQrScand from "./Pages/Doctor/PrescriptionPage/PrescriptionQrScand";
import Logout from "./Components/Logout";
import LandingPage from "./landing/LandingPage";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<RegistrationPage />} />
          <Route path="/logout" element={Logout} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          <Route path="/doctor/dashboard" element={<PrescriptionForm />} />
          <Route path="/pmanager/dashboard/*" element={<PMDashboard />} />
          <Route
            path="/pharmacist/dashboard/*"
            element={<PharmacistDashboard />}
          />
          <Route path="prescription/qr/:qr" element={<PrescriptionQrScand />} />
        </Routes>
      </Router>
      {/*<PrescriptionForm />
      <PrescriptionQrSearch />
      <UpdateProfilepm />*/}
    </div>
  );
}

export default App;
