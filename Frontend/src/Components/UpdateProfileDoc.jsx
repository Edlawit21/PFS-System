import { Drawer, Button, Input, Form, message, Spin } from "antd";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Api from "../api/axiosInstance";
import { UserOutlined } from "@ant-design/icons";
import Logout from "./Logout";

const UpdateProfileDoc = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Form instance to control the form values

  // Function to fetch profile data
  const fetchProfileData = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      console.log("No token found");
      return; // If token is not available, do not proceed
    }

    const userId = document.cookie.split("=")[1]; // Retrieve userId from cookies

    setLoading(true); // Start loading when fetching data
    try {
      const response = await Api.get(`/doctor/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(response.data); // Set the fetched profile data
      form.setFieldsValue(response.data.userInfo); // Set the form's initial values
      form.setFieldsValue({
        ...response.data.userInfo,
        hospitalName: response.data.doctorRegistration?.hospitalName, // Include hospitalName
        specialization: response.data.doctorRegistration?.specialization, // Include specialization
      });
    } catch (error) {
      console.error(
        "Error fetching profile data:",
        error.response ? error.response.data : error
      );
      message.error("Failed to fetch profile data.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const showDrawer = async () => {
    await fetchProfileData(); // Fetch profile data when the drawer is opened
    setOpen(true); // Open the drawer
  };

  const onClose = () => {
    setOpen(false); // Close the drawer
    setIsEditing(false); // Reset editing state when closing
    form.resetFields(); // Reset form fields when closing
    setProfileData(null); // Reset profile data
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  // Handle form submission to update profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      // Validate the form fields before submission
      const updatedProfile = await form.validateFields(); // Get the updated form values after validation
      console.log(updatedProfile); // Check the updated profile data

      // Call the API to update profile information
      const response = await Api.put(
        `/doctor/update`, // Ensure this is the correct endpoint
        updatedProfile
      );

      message.success("Profile updated successfully!");
      setProfileData(response.data); // Update the profileData with the new data
      setIsEditing(false); // Exit editing mode
      await fetchProfileData();
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    }
  };

  return (
    <div>
      <Button
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          margin: "10px",
        }}
        onClick={showDrawer}
      >
        <UserOutlined style={{ fontSize: "20px" }} />
      </Button>
      <Drawer title="Profile" onClose={onClose} open={open}>
        <div>
          {loading ? (
            <Spin />
          ) : (
            <>
              {!isEditing && (
                <div className="flex justify-center items-center h-full">
                  <Button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
              {isEditing ? (
                <div>
                  <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                  />
                  <Form
                    style={{ marginTop: "10px" }}
                    form={form} // Associate form instance
                    layout="vertical"
                    initialValues={profileData?.userInfo} // Initial form values from profileData
                  >
                    <Form.Item label="First Name" name="firstname">
                      <Input name="firstname" />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastname">
                      <Input name="lastname" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input name="email" />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phoneNumber">
                      <Input name="phoneNumber" />
                    </Form.Item>
                    <Form.Item label="Hospital Name" name="hospitalName">
                      <Input name="hospitalName" />
                    </Form.Item>
                    <Form.Item label="Specialization" name="specialization">
                      <Input name="specialization" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" onClick={handleSave}>
                        Update Profile
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <div className="mt-8">
                  <h1 className="text-2xl font-bold text-center mb-4">
                    Profile Information
                  </h1>
                  <div className="space-y-4 text-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-semibold">First Name:</span>
                      <span className="text-gray-600">
                        {profileData?.userInfo?.firstname}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-semibold">Last Name:</span>
                      <span className="text-gray-600">
                        {profileData?.userInfo?.lastname}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-semibold">Email:</span>
                      <span className="text-gray-600">
                        {profileData?.userInfo?.email}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-semibold">Phone Number:</span>
                      <span className="text-gray-600">
                        {profileData?.userInfo?.phoneNumber}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-semibold">Hospital Name:</span>
                      <span className="text-gray-600">
                        {profileData?.doctorRegistration?.hospitalName}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-semibold">Specialization:</span>
                      <span className="text-gray-600">
                        {profileData?.doctorRegistration?.specialization}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="m-6 flex justify-center ">
          <Logout />
        </div>
      </Drawer>
    </div>
  );
};

export default UpdateProfileDoc;
