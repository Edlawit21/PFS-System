import { Modal, Input, Button, Form } from "antd";
import { useState } from "react";

const AddTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button
        style={{
          fontWeight: "bold",
          color: "grey",
          width: "160px",
          borderWidth: "2px",
        }}
        onClick={showModal}
      >
        Add
      </Button>
      <Modal
        title="Add Medication Entry"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="Medication Name"
            name="medicationName"
            rules={[
              { required: true, message: "Please input the medication name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Purpose"
            name="purpose"
            rules={[{ required: true, message: "Please input the purpose!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Dosage"
            name="dosage"
            rules={[{ required: true, message: "Please input the dosage!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Route"
            name="route"
            rules={[{ required: true, message: "Please input the route!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Frequency"
            name="frequency"
            rules={[{ required: true, message: "Please input the frequency!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddTable;
