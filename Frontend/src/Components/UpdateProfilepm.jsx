import { Drawer, Button, Avatar, Input, Form } from "antd";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

const UpdateProfilepm = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    password: "password123",
    hospitalName: "City Hospital",
    hospitalType: "General",
    specialization: "Cardiology",
  });

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

  const handleSave = () => {
    console.log("Updated Profile Data:", profileData);
    setIsEditing(false); // Exit edit mode after saving
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
                  <Input value={profileData.name} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Email:" name="email">
                  <Input value={profileData.email} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Phone Number:" name="phone">
                  {" "}
                  <Input value={profileData.phone} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Password:" name="password">
                  <Input.Password
                    value={profileData.password}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Pharmacy Name:" name="pharmaName">
                  <Input
                    value={profileData.hospitalName}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="State :" name="state">
                  {" "}
                  <Input
                    value={profileData.hospitalType}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="City:" name="city">
                  <Input
                    value={profileData.specialization}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="OperatingDays:" name="operatingDays">
                  <Input
                    value={profileData.specialization}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="ServicesOffered:" name="serviceOffered">
                  <Input
                    value={profileData.specialization}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Set Location:" name="setLocation">
                  <Input
                    value={profileData.specialization}
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
              <h2>Name: {profileData.name}</h2>
              <h2>Email: {profileData.email}</h2>
              <h2>Phone Number: {profileData.phone}</h2>
              <h2>Password: {profileData.password}</h2>
              <h2>State: {profileData.state}</h2>
              <h2>City: {profileData.city}</h2>
              <h2>ServicesOffered: {profileData.serviceOffered}</h2>
              <h2>OperatingDays: {profileData.operatingDays}</h2>
              <h2>Set Location: {profileData.setLocation}</h2>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default UpdateProfilepm;
