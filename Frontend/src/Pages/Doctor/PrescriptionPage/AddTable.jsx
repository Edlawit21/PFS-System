import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, Input } from "antd";

const AddTable = ({ onAdd, medication, isEditing, form }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
    if (isEditing && medication) {
      form.setFieldsValue(medication);
    }
  }, [isEditing, medication, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onAdd(values);
      form.resetFields();
      setIsModalOpen(false);
    } catch (info) {
      console.log("Validation failed:", info);
      console.log("Error Fields:", info.errorFields);
      info.errorFields.forEach((field) => {
        console.error(`Field: ${field.name[0]}, Errors: ${field.errors}`);
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset fields on cancel
  };

  useEffect(() => {
    if (isEditing && medication) {
      showModal();
    } else if (!isEditing) {
      setIsModalOpen(false); // Close modal if not editing
    }
  }, [isEditing, medication, showModal]);

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
        <Form form={form} layout="vertical">
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

AddTable.propTypes = {
  onAdd: PropTypes.func.isRequired,
  medication: PropTypes.object,
  isEditing: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
};

export default AddTable;
