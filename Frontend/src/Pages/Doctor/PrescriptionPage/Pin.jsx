import { useState } from "react";
import { Input } from "antd";

const Pin = () => {
  const [otpValue, setOtpValue] = useState("");

  const handleChange = (e) => {
    setOtpValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="mb-10">
      <h2
        className="mb-4 flex
      justify-center"
      >
        Enter your Pin Code
      </h2>
      <Input.OTP
        mask="🔒"
        value={otpValue}
        onChange={handleChange}
        length={5}
        style={{}}
      />
    </div>
  );
};

export default Pin;
