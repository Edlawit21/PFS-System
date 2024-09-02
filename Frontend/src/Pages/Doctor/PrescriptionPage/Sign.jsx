import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button, Form } from "antd";
import s from "../../../Assets/s.png";
import PropTypes from "prop-types";

const SignatureField = ({ form }) => {
  const [hasSigned, setHasSigned] = useState(false);
  const signatureRef = useRef(null);

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setHasSigned(false);
      form.setFieldsValue({ signature: "" }); // Clear the form field value
      form.setFields([{ name: "signature", errors: [] }]); // Clear validation error
    }
  };

  const handleEnd = () => {
    const signatureData = signatureRef.current.toDataURL();
    setHasSigned(!!signatureData); // Check if there is a signature
    form.setFieldsValue({ signature: signatureData }); // Update the form value
    form.setFields([{ name: "signature", errors: [] }]); // Clear validation error
  };

  return (
    <Form.Item
      name="signature"
      label={
        <span style={{ fontSize: "1.1rem", fontWeight: "400" }}>
          Physician Signature
        </span>
      }
      rules={[
        {
          required: true,
          message: "Please enter your Signature!",
        },
      ]}
    >
      <div
        className="w-[350px] h-[150px] border-2 border-[#E5EAF4] rounded flex flex-col"
        style={{
          backgroundImage: !hasSigned ? `url(${s})` : "none",
          backgroundSize: "300px 120px ",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <SignatureCanvas
          ref={signatureRef}
          penColor="blue"
          canvasProps={{ width: 350, height: 150 }}
          onEnd={handleEnd}
        />
        <div className="m-1 flex justify-end">
          <Button
            onClick={handleClear}
            style={{ backgroundColor: "#E5EAF4", color: "#002699" }}
            size="small"
          >
            Clear
          </Button>
        </div>
      </div>
    </Form.Item>
  );
};

SignatureField.propTypes = {
  form: PropTypes.object.isRequired, // Define form prop validation
};

export default SignatureField;
