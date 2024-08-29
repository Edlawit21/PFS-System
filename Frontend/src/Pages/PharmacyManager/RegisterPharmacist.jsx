import { Form, Input, Button, DatePicker, Upload, Radio, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const RegisterPharmacist = () => {
  return (
    <div>
      <h2>Register Pharmacist</h2>
      <div className="bg-white mt-6 rounded-lg py-4">
        <Form layout="vertical" requiredMark={false} style={{ margin: "30px" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Firstname :"
                name="firstname"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input placeholder="Firstname" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Lastname :"
                name="lastname"
                rules={[
                  { required: true, message: "Please input your lastname!" },
                ]}
              >
                <Input placeholder="Lastname" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Radio.Group>
              <Radio value={1}>Male</Radio>
              <Radio value={2}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Contact Information"
            name="contact"
            rules={[
              {
                required: true,
                message: "Please enter your contact information",
              },
            ]}
          >
            <div className="flex gap-8">
              <Input addonBefore="Phone" type="number" />
              <Input addonBefore="Email" type="email" />
            </div>
          </Form.Item>
          <Form.Item
            label="Residential Address"
            name="residentialAddress"
            rules={[
              {
                required: true,
                message: "Please enter your residential address",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Educational Information"
                name="education"
                layout="horizontal"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList}
                extra="Upload educational info"
                rules={[
                  {
                    required: true,
                    message: "Please enter your degree information",
                  },
                ]}
              >
                <Upload action="/upload" listType="picture">
                  <Button icon={<UploadOutlined />}>
                    Upload Educational Document
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Government-Issued ID"
                name="idDocument"
                layout="horizontal"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList}
                extra="Upload a copy of government-issued ID"
                rules={[
                  {
                    required: true,
                    message: "Please upload file",
                  },
                ]}
              >
                <Upload action="/upload" listType="picture">
                  <Button icon={<UploadOutlined />}>Upload ID</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-between ">
            <Form.Item
              label="Graduation Date"
              name="graduationDate"
              rules={[
                {
                  required: true,
                  message: "Please select your graduation date",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="License Number"
              name="licenseNumber"
              rules={[
                { required: true, message: "Please enter your license number" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="License Expiry Date"
              name="licenseExpiryDate"
              rules={[
                {
                  required: true,
                  message: "Please select your license expiry date",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </div>
          <Form.Item label="Experiance" name="experiance">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            label="Passport-Size Photo"
            name="passportPhoto"
            layout="horizontal"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            extra="Upload a passport-size photo"
          >
            <Upload action="/upload" listType="picture">
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "300px" }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPharmacist;
