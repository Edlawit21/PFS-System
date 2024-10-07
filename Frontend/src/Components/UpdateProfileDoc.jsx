import { Drawer, Button, Avatar, Input, Form, message, Spin } from "antd";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Api from "../api/axiosInstance"; // Import your Axios instance

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
      <Button type="primary" onClick={showDrawer}>
        Open Profile
      </Button>
      <Drawer title="Profile" onClose={onClose} open={open}>
        <div>
          <Avatar size={100} />
        </div>
        <div>
          {loading ? (
            <Spin />
          ) : (
            <>
              {!isEditing && <Button onClick={handleEdit}>Edit Profile</Button>}
              {isEditing ? (
                <div>
                  <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                  />
                  <Form
                    form={form} // Associate form instance
                    layout="vertical"
                    initialValues={profileData?.userInfo} // Initial form values from profileData
                  >
                    <Button>Change Picture</Button>
                    <Form.Item
                      label="First Name"
                      name="firstname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your first name!",
                        },
                      ]}
                    >
                      <Input name="firstname" />
                    </Form.Item>
                    <Form.Item
                      label="Last Name"
                      name="lastname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },
                      ]}
                    >
                      <Input name="lastname" />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input name="email" />
                    </Form.Item>
                    <Form.Item
                      label="Phone Number"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                      ]}
                    >
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
                <div>
                  <h2>First Name: {profileData?.userInfo?.firstname}</h2>
                  <h2>Last Name: {profileData?.userInfo?.lastname}</h2>
                  <h2>Email: {profileData?.userInfo?.email}</h2>
                  <h2>Phone Number: {profileData?.userInfo?.phoneNumber}</h2>
                  <h2>
                    Hospital Name:{" "}
                    {profileData?.doctorRegistration?.hospitalName}
                  </h2>
                  <h2>
                    Specialization:{" "}
                    {profileData?.doctorRegistration?.specialization}
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default UpdateProfileDoc;
