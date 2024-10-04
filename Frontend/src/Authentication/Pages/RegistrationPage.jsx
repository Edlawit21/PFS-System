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

const RegistrationPage = () => {
  const [current, setCurrent] = useState(0);
  const [role, setRole] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  // Form instances for each step
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm(); // For PMAdditionalStep (only for pharmacy managers)

  // Dynamically generate steps based on the role

  const steps = [
    { title: "Step 1", description: "Basic Registration" },
    { title: "Step 2", description: "Professional Details" },
    ...(role === "pharmacyManager"
      ? [{ title: "Step 3", description: "Address Info" }]
      : []),
    {
      title: role === "pharmacyManager" ? "Step 4" : "Step 3",
      description: "Finish",
    },
  ];

  {
    /*const steps = [
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
  ].filter(Boolean);*/
  }

  const handleRoleChange = (value) => {
    if (role !== value) {
      setRole(value);
      setCurrent(0); // Reset to the first step when the role changes
    }
  };
  const validateForm = async () => {
    const formList = [form1, form2, form3, form4];
    try {
      await formList[current].validateFields();
      return true;
    } catch (error) {
      console.log("Validation failed:", error);
      return false;
    }
  };

  {
    /*const validateForm = async () => {
    let form;
    switch (current) {
      case 0:
        form = form1;
        break;
      case 1:
        form = form2;
        break;
      case 2:
        form = role === "pharmacyManager" ? form3 : form4; // Conditional form based on role
        break;
      case 3:
        form = form4; // For PMAdditionalStep (if applicable)
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
  };*/
  }

  const next = async () => {
    const isValid = await validateForm();
    if (isValid) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  // Submit all forms when Done is clicked

  const submitAllForms = async () => {
    const validData = {};
    const invalidData = {};

    const forms = [form1, form2, form3, form4];
    for (let i = 0; i < forms.length; i++) {
      try {
        const data = await forms[i].validateFields();
        validData[`step${i + 1}`] = data; // Store valid data by step
      } catch (error) {
        invalidData[`step${i + 1}`] = error.errorFields; // Store invalid data
      }
    }

    // Handle invalid data
    if (Object.keys(invalidData).length > 0) {
      console.error("Invalid Data:", invalidData);
      message.error("Please fix the highlighted fields.");
      return; // Stop submission if there are errors
    }

    // Proceed with API submission
    try {
      const formData = new FormData();
      // Append valid data to FormData
      Object.keys(validData).forEach((key) => {
        Object.keys(validData[key]).forEach((field) => {
          formData.append(field, validData[key][field]);
        });
      });

      console.log(formData);
      return;

      // Submit form data
      await Api.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Conditional API calls based on role
      if (role === "doctor") {
        await Api.post("/doctor/register", validData.step2);
      } else if (role === "pharmacyManager") {
        await Api.post("/pharmacy-manager/register", validData.step2);
        await Api.post("/address", validData.step3);
      }

      message.success("Registration successful!");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again.";
    message.error(errorMessage);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  {
    /*const submitAllForms = async () => {
    const validData = {};
    const invalidData = {};

    const forms = [form1, form2, form3, form4];
    for (let i = 0; i < forms.length; i++) {
      try {
        const data = await forms[i].validateFields();
        validData[`step${i + 1}`] = data; // Store valid data by step
      } catch (error) {
        invalidData[`step${i + 1}`] = error.errorFields; // Store invalid data
      }
    }

    // Handle invalid data
    if (Object.keys(invalidData).length > 0) {
      console.error("Invalid Data:", invalidData);
      message.error("Please fix the highlighted fields.");
      return; // Stop submission if there are errors
    }

    // Proceed with API submission
    try {
      const formData = new FormData();
      // Append valid data to FormData
      Object.keys(validData).forEach((key) => {
        Object.keys(validData[key]).forEach((field) => {
          formData.append(field, validData[key][field]);
        });
      });

      // Submit form data
      await Api.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Conditional API calls based on role
      if (role === "doctor") {
        await Api.post("/doctor/register", validData.step2);
      } else if (role === "pharmacyManager") {
        await Api.post("/pharmacy-manager/register", validData.step2);
        await Api.post("/address", validData.step3);
      }

      message.success("Registration successful!");
    } catch (error) {
      console.error("Error submitting forms:", error);
      message.error(
        error.response?.data?.message ||
          "Failed to submit the form. Please try again."
      );
    }
  };*/
  }

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
              <div className="text-center mt-12 ">
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
                {current === 1 && role === "doctor" && (
                  <DocRegistration form={form2} />
                )}
                {current === 1 && role === "pharmacyManager" && (
                  <PMRegistration form={form2} />
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
          {!showForgetPassword &&
            !showLoginForm &&
            current < steps.length - 1 && (
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

                {/* Conditionally render Next or Done button */}
                {current === steps.length - 2 ? (
                  <Button
                    type="primary"
                    style={{
                      width: "100px",
                      height: "40px",
                      fontSize: "large",
                    }}
                    onClick={submitAllForms}
                  >
                    Done
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={next}
                    style={{
                      width: "100px",
                      height: "40px",
                      fontSize: "large",
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
