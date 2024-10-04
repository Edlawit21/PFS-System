import { useState } from "react";
import { Divider, Form, DatePicker, Input, Radio, Table, Button } from "antd";
import AddTable from "./AddTable";
import { Column } from "../../../Components/Column";
import "./Ant.css";
import SignatureField from "./Sign";
import Submit from "./Submit";
import Head from "./Head";
import Api from "../../../api/axiosInstance";

const { TextArea } = Input;

const PrescriptionForm = () => {
  const [form] = Form.useForm(); // Create a form instance
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [medications, setMedications] = useState([]);
  const [editingMedication, setEditingMedication] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [modalForm] = Form.useForm();

  const handleAddMedication = (medication) => {
    if (isEditing) {
      setMedications((prevMedications) =>
        prevMedications.map((med) =>
          med.key === editingMedication.key
            ? { ...medication, key: editingMedication.key }
            : med
        )
      );
    } else {
      setMedications((prevMedications) => [
        ...prevMedications,
        { key: Date.now(), ...medication },
      ]);
    }
    setEditingMedication(null);
    setIsEditing(false);
  };

  const handleEditMedication = (medication) => {
    setEditingMedication(medication);
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      console.log(values);

      console.log("Form Values Before Submission:", values);
      const fullFormData = {
        ...values,
        prescriptionDate: values.datePicker,
        medications: medications,
        signature: form.getFieldValue("signature"),
        physician: {
          name: {
            first: values.physician.name.first,
            last: values.physician.name.last,
          },
          phonenumber: values.physician.phonenumber,
        },
        patient: {
          name: {
            first: values.patient.name.first,
            last: values.patient.name.last,
          },
          phonenumber: values.patient.phonenumber,
          gender: values.patient.gender,
          age: values.patient.age,
          allergies: values.patient.allergies || "",
          condition: values.patient.condition || "",
        },
      };
      console.log(fullFormData);

      // API call
      const response = await Api.post(
        "/prescription/createPrescription",
        fullFormData,
        { withCredentials: true }
      );

      console.log(response.data);
      setFormData(fullFormData);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error submitting prescription:", error);
      // Optionally show a notification to the user
    }
  };

  return (
    <div className="w-screen h-screen bg-[#F3F3FE] overflow-auto">
      <Head />
      <div className="w-11/12 my-6 mx-auto bg-white shadow-md">
        <Form form={form} name="form" layout="vertical" requiredMark={false}>
          <h1 className="text-center p-3 font-bold">Prescription Form</h1>
          <Divider style={{ borderColor: "#e0e0e0", borderWidth: "1px" }} />
          <div className="mx-16">
            <Form.Item
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  Prescription Date :
                </span>
              }
              name="datePicker"
              rules={[{ required: true, message: "Please input Date!" }]}
            >
              <DatePicker
                style={{
                  width: "12rem",
                  marginTop: "6px",
                  borderWidth: "2px ",
                }}
              />
            </Form.Item>
            <h2 className="font-semibold">Patient Information</h2>
            <hr className="mt-4 mb-7" />
            <Form.Item label="Name :" required>
              <div className="flex justify-between w-3/4">
                <Form.Item
                  name={["patient", "name", "first"]}
                  rules={[
                    { required: true, message: "Please input First Name!" },
                  ]}
                  noStyle
                >
                  <Input
                    name="first"
                    placeholder="First Name"
                    style={{ width: "20rem", borderWidth: "2px" }}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name={["patient", "name", "last"]}
                  rules={[
                    { required: true, message: "Please input Last Name!" },
                  ]}
                  noStyle
                >
                  <Input
                    name="last"
                    placeholder="Last Name"
                    style={{ width: "20rem", borderWidth: "2px" }}
                    allowClear
                  />
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item
              name={["patient", "age"]}
              label="Age :"
              rules={[{ required: true, message: "Please input Age!" }]}
            >
              <Input
                type="number"
                style={{ width: "10rem", borderWidth: "2px" }}
              />
            </Form.Item>
            <Form.Item
              name={["patient", "gender"]}
              label="Gender :"
              rules={[{ required: true, message: "Please select Gender!" }]}
            >
              <Radio.Group
                style={{
                  width: "15rem",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name={["patient", "phonenumber"]}
              label="Phone Number :"
              rules={[
                {
                  required: true,
                  message: "Please enter a valid Phone Number!",
                },
              ]}
            >
              <Input
                type="text"
                style={{ width: "16rem", borderWidth: "2px" }}
              />
            </Form.Item>

            <Form.Item
              name={["patient", "allergies"]}
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  Allergies :
                </span>
              }
            >
              <TextArea
                rows={2}
                style={{ width: "30rem", borderWidth: "2px" }}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name={["patient", "condition"]}
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  Notable Health Condition :
                </span>
              }
            >
              <TextArea
                rows={6}
                placeholder="Type here......."
                allowClear
                style={{ borderWidth: "2px" }}
              />
            </Form.Item>
            {/* Medications */}
            <Form.Item label="List of Prescribed Medications">
              <AddTable
                form={modalForm}
                onAdd={handleAddMedication}
                medication={editingMedication}
                isEditing={isEditing}
              />
              <Table
                columns={[
                  { title: "No.", render: (_, __, index) => index + 1 },
                  ...Column,
                  {
                    title: "Actions",
                    render: (_, record) => (
                      <Button onClick={() => handleEditMedication(record)}>
                        Edit
                      </Button>
                    ),
                  },
                ]}
                dataSource={medications}
                pagination={false}
                className="custom-table"
                size="small"
                bordered
                style={{
                  border: "1px solid #d9d9d9",
                  borderCollapse: "collapse",
                  borderRadius: "8px",
                  marginTop: "14px",
                }}
              />
            </Form.Item>

            {/* Physician Information */}
            <Form.Item label="Physician Name :" required>
              <div className="flex justify-between w-3/4">
                <Form.Item
                  name={["physician", "name", "first"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input Physician First Name!",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="First Name"
                    style={{ width: "20rem", borderWidth: "2px" }}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name={["physician", "name", "last"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input Physician Last Name!",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Last Name"
                    style={{ width: "20rem", borderWidth: "2px" }}
                    allowClear
                  />
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item
              name={["physician", "phonenumber"]}
              label="Physician Phone Number :"
              rules={[
                {
                  required: true,
                  message: "Please enter a valid Phone Number!",
                },
              ]}
            >
              <Input
                type="text"
                style={{ width: "16rem", borderWidth: "2px" }}
              />
            </Form.Item>

            {/* Signature Field */}
            <SignatureField form={form} />

            <hr className="mt-16" />
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Button
                size="large"
                style={{
                  margin: "40px",
                  width: "200px",
                  backgroundColor: "#4d4dff",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "large",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>

        <Submit
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default PrescriptionForm;
