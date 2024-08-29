import { Button, Divider, Form, Input, Modal, Select, DatePicker } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";
import "../Doctor/PrescriptionPage/Ant.css";

const { Option } = Select;

const ProductModal = ({ visible, onClose, onAdd, initialValues }) => {
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
        <h3 className="mb-4">
          {initialValues ? "Edit Category" : "Add Product"}
        </h3>
        <Divider />
        <Form
          form={form}
          requiredMark={false}
          labelCol={{ span: 8 }} // Adjust label column width
          className="product-form"
        >
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Medicine Name</span>}
            name="medname"
            rules={[
              {
                required: true,
                message: "Please input the medicine name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Category</span>}
            name="category"
            rules={[
              {
                required: true,
                message: "Please input the category",
              },
            ]}
          >
            <Select>
              <Option value="category1">Category 1</Option>
              <Option value="category2">Category 2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Sub-Category</span>}
            name="subcategory"
            rules={[
              {
                required: true,
                message: "Please input the subcategory",
              },
            ]}
          >
            <Select>
              <Option value="subcategory1">Sub-Category 1</Option>
              <Option value="subcategory2">Sub-Category 2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Actual Price</span>}
            name="actual-price"
            rules={[
              {
                required: true,
                message: "Please input actual price",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Selling Price</span>}
            name="sell-price"
            rules={[
              {
                required: true,
                message: "Please input selling price",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Quantity</span>}
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input quantity",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Register Date</span>}
            name="register-date"
            rules={[
              {
                required: true,
                message: "Please choose the register date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Expire Date</span>}
            name="expire-date"
            rules={[
              {
                required: true,
                message: "Please choose the expire date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Sold-Quantity</span>}
            name="sold-qty"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontSize: "16px" }}>Remain-Quantity</span>}
            name="remain-qty"
          >
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
