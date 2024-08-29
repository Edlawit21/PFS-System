import { Button, Divider, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";

const CategoryModal = ({ visible, onClose, onAdd, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onAdd(values);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      open={visible}
      footer={[
        <Button key="submit" onClick={handleSubmit} style={{ width: "100%" }}>
          {initialValues ? "Update" : "Add"}
        </Button>,
      ]}
      onCancel={onClose}
    >
      <div>
        <h2 className="mb-4">
          {initialValues ? "Edit Category" : "Add Category"}
        </h2>
        <Divider />
        <Form form={form} requiredMark={false}>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input the category",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sub-Category"
            name="subcategory"
            rules={[
              {
                required: true,
                message: "Please input the subcategory",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

CategoryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    category: PropTypes.string,
    subcategory: PropTypes.string,
  }),
};

CategoryModal.defaultProps = {
  initialValues: null,
};

export default CategoryModal;
