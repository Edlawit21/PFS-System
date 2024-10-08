import { useState } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { sideItems } from "./SideItems"; // Adjust the path as needed
import Logout from "../Logout";

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const items = sideItems[role] || [];
  const [stateOpenKeys, setStateOpenKeys] = useState([]);

  const levelKeys = getLevelKeys(items);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      setStateOpenKeys(
        openKeys.filter((key) => levelKeys[key] === levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const handleClick = (e) => {
    const item = findItemByKey(items, e.key);
    if (item && item.path) {
      navigate(item.path);
    }
  };

  const findItemByKey = (items, key) => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const result = findItemByKey(item.children, key);
        if (result) return result;
      }
    }
    return null;
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="text-4xl font-bold text-center py-3 border-b border-gray-200 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-transparent bg-clip-text  rounded-lg">
        PFS
      </div>

      <Menu
        mode="inline"
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onClick={handleClick}
        style={{ height: "100%", overflowY: "auto", marginTop: "10px" }}
      >
        {items.map((item) =>
          item.children ? (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>{child.label}</Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          )
        )}
        <div className="flex flex-col mt-56 items-center">
          {" "}
          <Logout />
        </div>
      </Menu>
    </div>
  );
};

export default Sidebar;
