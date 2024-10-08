import { Button, Divider, Form, Input, Modal, DatePicker, message } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ProductModal = ({ visible, onClose, onAdd, initialValues }) => {
  const [form] = Form.useForm();

  // Set form initial values
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields(); // Reset fields if no initialValues
    }
  }, [initialValues, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      console.log(values);

      const formattedValues = {
        ...values,
        expireDate: values.expireDate
          ? values.expireDate.format("YYYY-MM-DD")
          : null,
        registerDate: values.registerDate
          ? values.registerDate.format("YYYY-MM-DD")
          : null,
      };

      await onAdd(formattedValues); // Call the add or update function
      message.success(
        `Product ${initialValues ? "updated" : "added"} successfully!`
      );
      onClose();
    } catch (error) {
      console.log(error);
      message.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Modal
      open={visible}
      footer={[
        <Button key="submit" onClick={form.submit} style={{ width: "100%" }}>
          {initialValues ? "Update" : "Add"}
        </Button>,
      ]}
      onCancel={onClose}
    >
      <div>
        <h3 className="mb-4">
          {initialValues ? "Edit Product" : "Add Product"}
        </h3>
        <Divider />
        <Form
          form={form}
          requiredMark={false}
          labelCol={{ span: 8 }}
          onFinish={handleSubmit} // Handle form submission
          className="product-form"
        >
          {/* Medicine Name */}
          <Form.Item
            label="Medicine Name"
            name="medname"
            rules={[
              { required: true, message: "Please input the medicine name" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Actual Price */}
          <Form.Item
            label="Actual Price"
            name="actualPrice"
            rules={[{ required: true, message: "Please input actual price" }]}
          >
            <Input type="number" />
          </Form.Item>

          {/* Selling Price */}
          <Form.Item
            label="Selling Price"
            name="sellPrice"
            rules={[{ required: true, message: "Please input selling price" }]}
          >
            <Input type="number" />
          </Form.Item>

          {/* Quantity */}
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input quantity" }]}
          >
            <Input type="number" />
          </Form.Item>

          {/* Register Date */}
          <Form.Item
            label="Register Date"
            name="registerDate"
            rules={[
              { required: true, message: "Please choose the register date" },
            ]}
          >
            <DatePicker />
          </Form.Item>

          {/* Expire Date */}
          <Form.Item
            label="Expire Date"
            name="expireDate"
            rules={[
              { required: true, message: "Please choose the expire date" },
            ]}
          >
            <DatePicker />
          </Form.Item>

          {/* Sold Quantity */}
          <Form.Item label="Sold Quantity" name="soldQty">
            <Input disabled />
          </Form.Item>

          {/* Remaining Quantity */}
          <Form.Item label="Remaining Quantity" name="remainQty">
            <Input disabled />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

ProductModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    category: PropTypes.string,
    subcategory: PropTypes.string,
  }),
};

ProductModal.defaultProps = {
  initialValues: null,
};

export default ProductModal;
