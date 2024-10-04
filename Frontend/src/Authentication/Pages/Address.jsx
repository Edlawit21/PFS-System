import { Form, Input, Select, TimePicker, Button, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

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

        <Form.List name="branches">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 16 }}
            >
              {/* Render branches */}
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Branch ${field.name + 1}`}
                  key={field.key}
                  extra={
                    fields.length > 1 ? (
                      <CloseOutlined onClick={() => remove(field.name)} />
                    ) : null
                  }
                >
                  <Form.Item
                    label="Branch Name :"
                    name={[field.name, "branchName"]}
                    rules={[
                      { required: true, message: "Enter the branch name!" },
                    ]}
                  >
                    <Input placeholder="Branch Name" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="Branch Address :"
                    name={[field.name, "branchAddress"]}
                    rules={[
                      { required: true, message: "Enter the branch address!" },
                    ]}
                  >
                    <TextArea
                      placeholder="123 Haile Gebrselassie Road, Addis Ketema, Kebele 10, Addis Ababa, Ethiopia"
                      rows={3}
                      allowClear
                    />
                  </Form.Item>
                </Card>
              ))}

              {/* Button to add more branches */}
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: "200px",
                  display: "flex",
                  margin: "0 auto",
                  marginBottom: "8px",
                  backgroundColor: "#F3F3FE",
                }}
              >
                + Add Branch
              </Button>
            </div>
          )}
        </Form.List>

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
      </Form>
    </div>
  );
};

Address.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Address;
