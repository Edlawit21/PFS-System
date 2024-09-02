import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Head = () => {
  return (
    <div className="ml-4 mt-2">
      <Button style={{ width: "50px", height: "50px", borderRadius: "50%" }}>
        <UserOutlined style={{ fontSize: "20px" }} />
      </Button>
    </div>
  );
};

export default Head;
