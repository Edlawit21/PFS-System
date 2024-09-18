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
        { key: "1-1", label: "Doctors", path: "/admin/dashboard/doctors" },
        {
          key: "1-2",
          label: "Pharmacy Managers",
          path: "/admin/dashboard/pmanagers",
        },
      ],
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      label: "View Users",
      path: "/admin/dashboard/view-users",
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "View Pharmacist",
      path: "/admin/dashboard/view-pharmacist",
    },
    {
      key: "4",
      icon: <EnvironmentOutlined />,
      label: "App Track",
      path: "/admin/dashboard/app-track",
    },
    {
      key: "5",
      icon: <SolutionOutlined />,
      label: "User Support",
      path: "/admin/dashboard/user-support",
    },
  ],
  pharmacist: [
    {
      key: "1",
      icon: <ScanOutlined />,
      label: "Process Prescription",
      children: [
        { key: "1-1", label: "Scan", path: "/pharmacist/dashboard/scan" },
        { key: "1-2", label: "Search", path: "/pharmacist/dashboard/search" },
      ],
    },
    {
      key: "2",
      icon: <FileProtectOutlined />,
      label: "Generate Report",
      path: "/pharmacist/dashboard/generate-report",
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
        { key: "1-1", label: "Category", path: "pmanager/dashboard/category" },
        { key: "1-2", label: "Products", path: "pmanager/dashboard/products" },
      ],
    },
    {
      key: "3",
      icon: <UserAddOutlined />,
      label: " Pharmacist",
      children: [
        {
          key: "2-1",
          label: "Register Pharmacist",
          path: "pmanager/dashboard/register-p",
        },
        {
          key: "2-2",
          label: "View Pharmacist",
          path: "pmanager/dashboard/view-p",
        },
      ],
    },
    {
      key: "4",
      icon: <LineChartOutlined />,
      label: "View Report",
      path: "pmanager/dashboard/view-report",
    },
  ],
};
