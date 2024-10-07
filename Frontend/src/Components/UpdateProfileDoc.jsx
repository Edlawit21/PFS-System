import { Drawer, Button, Avatar, Input, Form, message, Spin } from "antd";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Api from "../api/axiosInstance"; // Import your Axios instance

const UpdateProfileDoc = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch profile data
  const fetchProfileData = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      console.log("No token found");
      return; // If token is not available, do not proceed
    }

    setLoading(true); // Start loading when fetching data
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get("/doctor/${userId}", {
        headers: { Authorization: `Bearer ${token}` },
      }); // Use the existing Axios instance
      console.log("Fetched Profile Data:", response.data);
      setProfileData(response.data); // Set the fetched profile data
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
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token); // Decode the token to get the user ID
      const userId = decoded.userId; // Adjust this based on your token's structure

      const response = await Api.put(`/doctor/update/${userId}`, profileData);
      message.success("Profile updated successfully!");
      console.log("Updated Profile Data:", response.data);
      setIsEditing(false); // Close the editing mode
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
                  <Form layout="vertical">
                    <Button>Change Picture</Button>
                    <Form.Item label="First Name" name="firstname">
                      <Input
                        value={profileData?.firstname}
                        name="firstname"
                        onChange={handleChange}
                      />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastname">
                      <Input
                        value={profileData?.lastname}
                        name="lastname"
                        onChange={handleChange}
                      />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input
                        value={profileData?.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phoneNumber">
                      <Input
                        value={profileData?.phoneNumber}
                        name="phoneNumber"
                        onChange={handleChange}
                      />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                      <Input.Password
                        value={profileData?.password}
                        name="password"
                        onChange={handleChange}
                      />
                    </Form.Item>
                    <Form.Item label="Hospital Name" name="hospitalName">
                      <Input
                        value={profileData?.hospitalName}
                        name="hospitalName"
                        onChange={handleChange}
                      />
                    </Form.Item>
                    <Form.Item label="Hospital Type" name="hospitalType">
                      <Input
                        value={profileData?.hospitalType}
                        name="hospitalType"
                        onChange={handleChange}
                      />
                    </Form.Item>
                    <Form.Item label="Specialization" name="specialization">
                      <Input
                        value={profileData?.specialization}
                        name="specialization"
                        onChange={handleChange}
                      />
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
                  <h2>First Name: {profileData?.firstname}</h2>
                  <h2>Last Name: {profileData?.lastname}</h2>
                  <h2>Email: {profileData?.email}</h2>
                  <h2>Phone Number: {profileData?.phoneNumber}</h2>
                  <h2>Hospital Name: {profileData?.hospitalName}</h2>
                  <h2>Hospital Type: {profileData?.hospitalType}</h2>
                  <h2>Specialization: {profileData?.specialization}</h2>
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
