import { Drawer, Button, Input, Form, message } from "antd";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Api from "../api/axiosInstance";
import { UserOutlined } from "@ant-design/icons";

const UpdateProfilepm = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
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
        const response = await Api.get("/pharmacy-manager/all");
        console.log("Fetched Pharmacy Managers:", response.data);
        setPharmacyManagers(response.data.pharmacyManagers);

        if (response.data.pharmacyManagers.length > 0) {
          const manager = response.data.pharmacyManagers[0];
          setProfileData({
            id: manager.user?._id || "",
            pmName: manager.pmName || "",
            pharmaName: manager.pharmaName || "",
            email: manager.user?.email || "",
            phone: manager.user?.phoneNumber || "",
            password: "", // Password should not be fetched directly
            state: manager.addressDetails?.state || "",
            city: manager.addressDetails?.city || "",
            operatingDays: manager.addressDetails?.operatingDays || "",
            serviceOffered:
              manager.addressDetails?.servicesOffered?.join(", ") || "",
            latitude: manager.addressDetails?.latitude || "",
            longitude: manager.addressDetails?.longitude || "",
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
    setIsEditing(true);
    // Set the initial values in the form when entering edit mode
    form.setFieldsValue(profileData);
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
    console.log("Profile ID:", profileData.id); // Check if this is undefined
    console.log("Profile Data:", profileData);

    if (!profileData.id) {
      message.error("Profile ID is missing. Unable to update.");
      return;
    }
    try {
      const response = await Api.put(
        `/pharmacy-manager/update/${profileData.id}`,
        profileData
      );
      console.log("Update response:", response.data);
      message.success("Profile updated successfully!");
      setIsEditing(false);
      // Update the form values after saving
      form.setFieldsValue(profileData);
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    }
  };

  return (
    <div>
      <Button
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        onClick={showDrawer}
      >
        <UserOutlined style={{ fontSize: "20px" }} />
      </Button>
      <Drawer title="Profile" onClose={onClose} open={open}>
        <div>
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
              ></Button>
              <Form
                style={{ marginTop: "10px" }}
                form={form}
                layout="vertical"
                initialValues={profileData}
              >
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
                <Form.Item label="State:" name="state">
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
                    value={profileData.setLocation || ""}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Latitude:" name="latitude">
                  <Input
                    name="latitude"
                    value={profileData.latitude || ""}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Longitude:" name="longitude">
                  <Input
                    name="longitude"
                    value={profileData.longitude || ""}
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
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg ">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Profile Information
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">Name:</span>
                  <span className="text-gray-700">
                    {profileData.pmName || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">
                    Pharmacy Name:
                  </span>
                  <span className="text-gray-700">
                    {profileData.pharmaName || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">Email:</span>
                  <span className="text-gray-700">
                    {profileData.email || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">
                    Phone Number:
                  </span>
                  <span className="text-gray-700">
                    {profileData.phone || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">Password:</span>
                  <span className="text-gray-700">
                    {profileData.password || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">State:</span>
                  <span className="text-gray-700">
                    {profileData.state || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">City:</span>
                  <span className="text-gray-700">
                    {profileData.city || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">
                    Services Offered:
                  </span>
                  <span className="text-gray-700">
                    {profileData.serviceOffered || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">
                    Operating Days:
                  </span>
                  <span className="text-gray-700">
                    {profileData.operatingDays || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">
                    Set Location:
                  </span>
                  <span className="text-gray-700">
                    {profileData.setLocation || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">Latitude:</span>
                  <span className="text-gray-700">
                    {profileData.latitude || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold text-gray-600">
                    Longitude:
                  </span>
                  <span className="text-gray-700">
                    {profileData.longitude || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default UpdateProfilepm;
