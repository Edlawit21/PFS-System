import {
  AppstoreOutlined,
  FileProtectOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  UserOutlined,
  EnvironmentOutlined,
  SolutionOutlined,
  UserAddOutlined,
  LineChartOutlined,
  HomeOutlined,
  ScanOutlined,
} from "@ant-design/icons";

export const sideItems = {
  admin: [
    {
      key: "1",
      icon: <CheckCircleOutlined />,
      label: "Approval",
      children: [
        { key: "1-1", label: "Doctors", path: "/doctors" },
        { key: "1-2", label: "Pharmacy Managers", path: "/pmanagers" },
      ],
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      label: "View Users",
      path: "/view-users",
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "View Pharmacist",
      path: "/view-pharmacist",
    },
    {
      key: "4",
      icon: <EnvironmentOutlined />,
      label: "App Track",
      path: "/app-track",
    },
    {
      key: "5",
      icon: <SolutionOutlined />,
      label: "User Support",
      path: "/user-support",
    },
  ],
  pharmacist: [
    {
      key: "1",
      icon: <ScanOutlined />,
      label: "Process Prescription",
      children: [
        { key: "1-1", label: "Scan", path: "/scan" },
        { key: "1-2", label: "Search", path: "/search" },
      ],
    },
    {
      key: "2",
      icon: <FileProtectOutlined />,
      label: "Generate Report",
      path: "/generate-report",
    },
  ],
  pmanager: [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard ",
      path: "/",
    },
    {
      key: "2",
      icon: <HomeOutlined />,
      label: " Inventory",
      children: [
        { key: "1-1", label: "Category", path: "/category" },
        { key: "1-2", label: "Products", path: "/products" },
      ],
    },
    {
      key: "3",
      icon: <UserAddOutlined />,
      label: " Pharmacist",
      children: [
        { key: "2-1", label: "Register Pharmacist", path: "/register-p" },
        { key: "2-2", label: "View Pharmacist", path: "/view-p" },
      ],
    },
    {
      key: "4",
      icon: <LineChartOutlined />,
      label: "View Report",
      path: "/view-report",
    },
  ],
};
