import { Divider, Form, DatePicker, Input, Radio, Table } from "antd";
import AddTable from "./AddTable";
import { data } from "../../../Data/data";
import { Column } from "../../../Components/Column";
import "./Ant.css";
import SignatureField from "./Sign";
import Submit from "./Submit";

const { TextArea } = Input;
const PrescriptionForm = () => {
  return (
    <div className="w-screen h-screen bg-[#F3F3FE] overflow-auto">
      <div className="w-11/12 my-6 mx-auto bg-white shadow-md ">
        <Form name="form" layout="vertical" requiredMark={false}>
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
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
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
            <hr className=" mt-4 mb-7" />
            <Form.Item
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  Name :
                </span>
              }
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input Name!",
                },
              ]}
            >
              <div className="flex justify-between w-3/4">
                <div className=" flex flex-col ">
                  <Input
                    style={{
                      width: "20rem",
                      borderWidth: "2px",
                    }}
                    allowClear
                  />
                  <span className="my-2 text-[#a6a6a6]">First Name</span>
                </div>
                <div className="flex flex-col">
                  <Input
                    style={{ width: "20rem", borderWidth: "2px" }}
                    allowClear
                  />
                  <span className="my-2 text-[#a6a6a6]">Last Name</span>
                </div>
              </div>
            </Form.Item>
            <Form.Item
              name="age"
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  Age :
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input Age!",
                },
              ]}
            >
              <Input
                type="number"
                style={{ width: "10rem", borderWidth: "2px" }}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  Gender :
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please select Gender!",
                },
              ]}
            >
              <Radio.Group
                style={{
                  width: "15rem",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Radio value={1}>Male</Radio>
                <Radio value={2}>Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="phonenumber"
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  Phone Number :
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter a valid Phone Number!",
                },
              ]}
            >
              <Input
                type="number"
                style={{ width: "16rem", borderWidth: "2px" }}
              />
            </Form.Item>
            <Form.Item
              name="allergies"
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
              name="condition"
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
            <Form.Item
              name="medications"
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  List of Prescribed Medications
                </span>
              }
            >
              <AddTable />
              <Table
                columns={Column}
                dataSource={data}
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
            <Form.Item
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  Physician Name :
                </span>
              }
              name="physicianName"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <div className="flex justify-between w-3/4">
                <div className=" flex flex-col ">
                  <Input
                    style={{ width: "20rem", borderWidth: "2px" }}
                    allowClear
                  />
                  <span className="my-2 text-[#a6a6a6]">First Name</span>
                </div>
                <div className="flex flex-col">
                  <Input
                    style={{ width: "20rem", borderWidth: "2px" }}
                    allowClear
                  />
                  <span className="my-2 text-[#a6a6a6]">Last Name</span>
                </div>
              </div>
            </Form.Item>
            <Form.Item
              name="physicianPhonenumber"
              label={
                <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                  Physician Phone Number :
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter a valid Phone Number!",
                },
              ]}
            >
              <Input
                type="number"
                style={{ width: "16rem", borderWidth: "2px" }}
              />
            </Form.Item>
            <SignatureField />
            <hr className="mt-16" />
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Submit />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PrescriptionForm;
