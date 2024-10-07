import { Form, Input, Select, TimePicker, Button, Modal } from "antd";
import PropTypes from "prop-types";
import Map from "../Components/Map";
import { useState } from "react";

const { Option } = Select;
const { TextArea } = Input;

const services = [
  "Prescription Medication Dispensing",
  "Medication Counseling",
  "Over-the-Counter (OTC) Medications",
  "Delivery",
  "Health Screenings",
  "First Aid Supplies",
  "Health and Wellness Products",
];

const states = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "Southern Nations, Nationalities, and Peoples' Region (SNNPR)",
  "South West Ethiopia Peoples' Region",
  "Tigray",
];

const Address = ({ form }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // Set the form values for latitude and longitude
    form.setFieldsValue({
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  return (
    <div className="px-6">
      <h1 className="flex justify-center mb-4 font-medium">
        Address of Your Pharmacy
      </h1>
      <Form layout="vertical" requiredMark={false} form={form}>
        <Form.Item
          label="State/Province :"
          name="state"
          rules={[{ required: true, message: "Please choose a state!" }]}
        >
          <Select
            showSearch
            placeholder="Select a state"
            filterOption={(input, option) =>
              (option?.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            style={{ width: "100%" }}
          >
            {states.map((state) => (
              <Option key={state} value={state}>
                {state}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="City :"
          name="city"
          rules={[{ required: true, message: "Please enter the city!" }]}
        >
          <Input placeholder="Enter your city" allowClear />
        </Form.Item>

        <Form.Item
          label="Contact Number :"
          name="contactNumber"
          rules={[
            { required: true, message: "Please input your contact number!" },
          ]}
        >
          <Input type="tel" placeholder="Enter contact number" allowClear />
        </Form.Item>

        <Form.Item
          label="Operating Days and Hours :"
          name="operatingDays"
          rules={[
            {
              required: true,
              message: "Please provide operating days and hours!",
            },
          ]}
        >
          <div style={{ position: "relative" }}>
            <TimePicker.RangePicker
              style={{ width: "100%", marginBottom: "8px" }}
              format="HH:mm"
            />
            <TextArea
              placeholder={`Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed`}
              rows={4}
              style={{ marginTop: "8px" }} // Add space for TimePicker
              allowClear
            />
          </div>
        </Form.Item>

        <Form.Item
          label="Services Offered :"
          name="servicesOffered"
          rules={[
            { required: true, message: "Please select services offered!" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select services offered"
            style={{ width: "100%" }}
            dropdownAlign={{
              offset: [0, 0],
              overflow: { adjustX: true, adjustY: true },
            }}
          >
            {services.map((service) => (
              <Option key={service} value={service}>
                {service}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={showModal}>
            Set Location
          </Button>
          {selectedLocation ? (
            <div className="mt-2 text-sm text-gray-700">
              <p>Selected Location:</p>
              <p>Latitude: {selectedLocation.lat}</p>
              <p>Longitude: {selectedLocation.lng}</p>
            </div>
          ) : (
            <p className="text-red-600 text-sm">
              Please select a location on the map.
            </p>
          )}
        </Form.Item>

        {/* Hidden form fields for latitude and longitude */}
        <Form.Item name="latitude" style={{ display: "none" }}>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item name="longitude" style={{ display: "none" }}>
          <Input type="hidden" />
        </Form.Item>

        {/* Modal for setting the location */}
        <Modal
          title="Set Location"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Map onLocationSelect={handleLocationSelect} />
        </Modal>
      </Form>
    </div>
  );
};

Address.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Address;
