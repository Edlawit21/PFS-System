import { Drawer, Button, Avatar, Input, Form, message } from "antd";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Api from "../api/axiosInstance";

const UpdateProfilepm = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    pmName: "",
    pharmaName: "",
    email: "",
    phone: "",
    password: "",
    state: "",
    city: "",
    operatingDays: "",
    servicesOffered: "",
    latitude: "",
    longitude: "",
  });
  const [pharmacyManagers, setPharmacyManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacyManagers = async () => {
      try {
        const response = await Api.get("/pharmacy-manager/all"); // Adjust the URL as per your API
        console.log("Fetched Pharmacy Managers:", response.data); // Log the fetched data
        setPharmacyManagers(response.data.pharmacyManagers);
        // Assuming you want to set the first manager's data as default
        if (response.data.pharmacyManagers.length > 0) {
          const manager = response.data.pharmacyManagers[0];
          setProfileData({
            id: manager._id,
            pmName: manager.pmName,
            pharmaName: manager.pharmaName,
            email: manager.userId.email,
            phone: manager.userId.phoneNumber,
            password: "", // Password should not be fetched directly
            state: manager.addressDetails.state,
            city: manager.addressDetails.city,
            operatingDays: manager.addressDetails.operatingDays,
            serviceOffered: manager.addressDetails.servicesOffered.join(", "), // Adjust if this is an array
            setLocation: "", // Adjust based on your logic
            latitude: manager.addressDetails.latitude,
            longitude: manager.addressDetails.longitude,
          });
        }
      } catch (err) {
        console.error("Error fetching pharmacy managers:", err);
        setError(err.message || "An error occurred while fetching data.");
        message.error("Failed to fetch pharmacy managers.");
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacyManagers();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setIsEditing(true); // Start editing when Change Picture is clicked
  };

  const handleBack = () => {
    setIsEditing(false); // Exit editing when back arrow is clicked
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
      // Use the ID for the update request
      const response = await Api.put(
        `/pharmacy-manager/update/${profileData.id}`,
        profileData
      );
      console.log("Update response:", response.data);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    } finally {
      setIsEditing(false); // Exit edit mode after saving
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Profile" onClose={onClose} open={open}>
        <div className="">
          <Avatar size={100} />
        </div>
        <div>
          {!isEditing && <Button onClick={handleEdit}>Edit Profile</Button>}
          {isEditing ? (
            <div>
              {isEditing ? (
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  onClick={handleBack}
                ></Button>
              ) : null}
              <Form layout="vertical">
                <Button>Change Picture</Button>
                <Form.Item label="Name" name="pmName">
                  <Input
                    name="pmName"
                    value={profileData.pmName}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Pharmacy Name" name="pharmaName">
                  <Input
                    name="pharmaName"
                    value={profileData.pharmaName}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Email:" name="email">
                  <Input
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Phone Number:" name="phone">
                  <Input
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Password:" name="password">
                  <Input.Password
                    name="password"
                    value={profileData.password}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="State :" name="state">
                  <Input
                    name="state"
                    value={profileData.state}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="City:" name="city">
                  <Input
                    name="city"
                    value={profileData.city}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Operating Days:" name="operatingDays">
                  <Input
                    name="operatingDays"
                    value={profileData.operatingDays}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Services Offered:" name="serviceOffered">
                  <Input
                    name="serviceOffered"
                    value={profileData.serviceOffered}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Set Location:" name="setLocation">
                  <Input
                    name="setLocation"
                    value={profileData.setLocation}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Latitude:" name="latitude">
                  <Input
                    name="latitude"
                    value={profileData.latitude}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Longitude:" name="longitude">
                  <Input
                    name="longitude"
                    value={profileData.longitude}
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
              <h2>Name: {profileData.pmName}</h2>
              <h2>Email: {profileData.email}</h2>
              <h2>Phone Number: {profileData.phone}</h2>
              <h2>Password: {profileData.password}</h2>
              <h2>State: {profileData.state}</h2>
              <h2>City: {profileData.city}</h2>
              <h2>Services Offered: {profileData.serviceOffered}</h2>
              <h2>Operating Days: {profileData.operatingDays}</h2>
              <h2>Set Location: {profileData.setLocation}</h2>
              <h2>Latitude: {profileData.latitude}</h2>
              <h2>Longitude: {profileData.longitude}</h2>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default UpdateProfilepm;
