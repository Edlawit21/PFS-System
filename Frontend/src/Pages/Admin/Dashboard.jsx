import { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Layout, Grid, Drawer } from "antd";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import DocApprove from "./DocApprove";
import "../Doctor/PrescriptionPage/Ant.css";
import PManager from "./PManager";
import Users from "./Users";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();

  // Replace this with your actual user role fetching logic
  const userRole = "admin"; // This should come from user authentication or context

  useEffect(() => {
    // Automatically collapse the sidebar on tablet-sized screens (md)
    if (screens.md && !screens.lg) {
      setCollapsed(true);
    }

    // Automatically open the sidebar on larger screens if not collapsed
    if (screens.lg) {
      setCollapsed(false);
      setVisible(false);
    }
  }, [screens.md, screens.lg]);

  const toggleSidebar = () => {
    if (screens.xs) {
      setVisible(!visible);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      {!screens.xs && (
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={80} // Keeps the sidebar visible when collapsed on larger screens
          style={{
            position: "sticky",
            height: "100vh",
            left: 0,
            bottom: 0,
            top: 0,
          }}
        >
          <Sidebar role={userRole} />
        </Sider>
      )}

      <Layout className="custom-scrollbar" style={{ overflowY: "auto" }}>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <div className="p-6 bg-[#F1F5F9] custom-scrollbar">
          <Content
            style={{
              height: "auto",
              borderRadius: "8px",
              overflowY: "auto", // Makes the content scrollable if it overflows
            }}
          >
            <Routes>
              <Route path="doctors" element={<DocApprove />} />
              <Route path="pmanagers" element={<PManager />} />
              <Route path="view-users" element={<Users />} />
            </Routes>
          </Content>
        </div>
      </Layout>

      {/* Drawer for small screens */}
      {screens.xs && (
        <Drawer
          title=""
          placement="left"
          closable={false}
          onClose={() => setVisible(false)}
          open={visible}
          bodyStyle={{ padding: 0 }}
          width={256} // Width similar to the Sider for consistency
        >
          {/* Close Button */}
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setVisible(false)}
            style={{
              fontSize: "16px",
              position: "absolute",
              right: 16,
              top: 16,
              zIndex: 1000,
            }}
          />

          {/* Sidebar Content */}
          <Sidebar role={userRole} />
        </Drawer>
      )}
    </Layout>
  );
};

export default AdminDashboard;
