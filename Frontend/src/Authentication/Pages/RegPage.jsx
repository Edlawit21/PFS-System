import { useState } from "react";
import { Button, Form, Steps, message } from "antd";
import "../../Pages/Doctor/PrescriptionPage/Ant.css";
import RegistrationForm from "../Components/RegistrationForm";
import DocRegistration from "./DocRegistration";
import PMRegistration from "./PMRegistration";
import Address from "./Address";
import Finish from "./Finish";
import LoginForm from "./LoginForm";
import ForgetPassword from "../Components/ForgetPassword";
import { LoginOutlined } from "@ant-design/icons";
import Api from "../../api/axiosInstance";

const RegPage = () => {
  const [current, setCurrent] = useState(0);
  const [role, setRole] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  // State to store form data
  const [formData, setFormData] = useState({
    basicInfo: {},
    professionalDetails: {},
    addressInfo: {},
  });

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();

  const steps = [
    {
      title: "Step 1",
      description: "Basic Registration",
    },
    {
      title: "Step 2",
      description: "Professional Details",
    },
    role === "pharmacyManager" && {
      title: "Step 3",
      description: "Address Info",
    },
    {
      title: role === "pharmacyManager" ? "Step 4" : "Step 3",
      description: "Finish",
    },
  ].filter(Boolean);

  const handleRoleChange = (value) => {
    if (role !== value) {
      // Save current form data before resetting
      setFormData((prevData) => ({
        ...prevData,
        basicInfo: form1.getFieldsValue(),
      }));
      setRole(value);
      setCurrent(0); // Reset to the first step when the role changes
    }
  };

  const validateForm = async () => {
    let form;
    switch (current) {
      case 0:
        form = form1;
        break;
      case 1:
        form = form2;
        break;
      case 2:
        form = role === "pharmacyManager" ? form3 : form4;
        break;
      default:
        return true; // No validation needed for steps beyond current
    }
    try {
      await form.validateFields();
      return true;
    } catch (error) {
      console.log("Validation failed:", error);
      return false;
    }
  };

  const saveFormData = (step, form) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: form.getFieldsValue(),
    }));
  };

  const next = async () => {
    const isValid = await validateForm();
    if (isValid) {
      if (current === 0) {
        saveFormData("basicInfo", form1);
      } else if (current === 1) {
        saveFormData("professionalDetails", form2);
      } else if (current === 2 && role === "pharmacyManager") {
        saveFormData("addressInfo", form3);
      }
      setCurrent(current + 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (isValid) {
      const formDataToSend = new FormData();

      // Append non-file form data
      Object.keys(formData.basicInfo).forEach((key) => {
        console.log(key, formData.basicInfo[key]);

        formDataToSend.append(key, formData.basicInfo[key]);
      });
      Object.keys(formData.professionalDetails).forEach((key) => {
        console.log("prof", key, formData.professionalDetails[key]);
        formDataToSend.append(key, formData.professionalDetails[key]);
      });

      // Append address info for pharmacyManager
      if (role === "pharmacyManager") {
        Object.keys(formData.addressInfo).forEach((key) => {
          console.log("addres", key, formData.addressInfo[key]);

          formDataToSend.append(key, formData.addressInfo[key]);
        });
      }

      const complianceFile =
        form2.getFieldValue("compliance")?.[0]?.originFileObj;
      console.log("comp", complianceFile);

      const licensePMFile =
        form2.getFieldValue("licensePM")?.[0]?.originFileObj;
      const businessRFile =
        form2.getFieldValue("businessR")?.[0]?.originFileObj;

      // Append pharmacy manager specific files
      formDataToSend.append("compliance", complianceFile);
      formDataToSend.append("licensePM", licensePMFile);
      formDataToSend.append("businessR", businessRFile);
      // File inputs
      const educationalInfoFile =
        form2.getFieldValue("educationalInfo")?.[0]?.originFileObj;
      const certificateFile =
        form2.getFieldValue("certificate")?.[0]?.originFileObj;
      const medicalLicenseFile =
        form2.getFieldValue("medicalLicense")?.[0]?.originFileObj;

      formDataToSend.append("educationalInfo", educationalInfoFile);
      formDataToSend.append("certificate", certificateFile);
      formDataToSend.append("medicalLicense", medicalLicenseFile);

      try {
        // Check role and call the appropriate API
        if (role === "doctor") {
          const response = await Api.post("/doctor/register", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log(response.data);
          message.success("Doctor registration successful!");
        } else if (role === "pharmacyManager") {
          console.log("formdat", formDataToSend);

          const response = await Api.post(
            "/pharmacy-manager/register",
            formDataToSend,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          console.log(response.data);
          message.success("Pharmacy Manager registration successful!");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        message.error(
          "Registration failed. Please check the form and try again."
        );
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  return (
    <div className="bg-[#F0F6FF] w-full h-screen pt-6">
      <div className="flex w-4/6 h-[540px] mx-auto shadow-md border-t rounded-xl custom-steps bg-[white]">
        {/* Container for Steps */}
        <div className="flex flex-col w-1/3 h-[515px] my-auto ml-3 rounded-lg border border-gray-300 p-4 bg-[#483EFF]">
          {!showLoginForm && !showForgetPassword && (
            <>
              <Steps
                current={current}
                items={items}
                direction="vertical"
                style={{ height: "360px" }}
              />
              <div className="text-center mt-12">
                <Button
                  type="link"
                  onClick={() => setShowLoginForm(true)}
                  style={{
                    color: "white",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  <LoginOutlined />
                  Sign In
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Container for Content and Buttons */}
        <div className="flex flex-col w-2/3 h-full">
          <div className="flex-1 overflow-auto custom-scrollbar">
            {showForgetPassword ? (
              <ForgetPassword
                onBack={() => {
                  setShowForgetPassword(false);
                  setShowLoginForm(true);
                }}
              />
            ) : showLoginForm ? (
              <LoginForm
                onForgetPassword={() => setShowForgetPassword(true)}
                onBack={() => {
                  setShowLoginForm(false);
                  setCurrent(0); // Optionally reset to the registration form
                }}
              />
            ) : (
              <>
                {current === 0 && (
                  <RegistrationForm
                    form={form1}
                    onRoleChange={handleRoleChange}
                  />
                )}
                {current === 1 && role && (
                  <>
                    {role === "doctor" ? (
                      <DocRegistration form={form2} />
                    ) : (
                      <PMRegistration form={form2} />
                    )}
                  </>
                )}
                {current === 2 && role === "pharmacyManager" && (
                  <Address form={form3} />
                )}
                {(current === 2 && role === "doctor") ||
                (current === 3 && role === "pharmacyManager") ? (
                  <Finish form={form4} />
                ) : null}
              </>
            )}
          </div>

          {/* Conditionally render Next or Done button */}
          {!showForgetPassword && !showLoginForm && (
            <div className="flex justify-around my-4">
              {current > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                    width: "100px",
                    height: "40px",
                    fontSize: "large",
                  }}
                  onClick={prev}
                >
                  Previous
                </Button>
              )}

              {/* Show "Done" on the last step but continue with the next functionality */}
              <Button
                type="primary"
                onClick={current === steps.length - 1 ? handleSubmit : next}
                style={{
                  width: "100px",
                  height: "40px",
                  fontSize: "large",
                }}
              >
                {current === steps.length - 1 ? "Done" : "Next"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegPage;
