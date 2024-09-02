import { Button, Avatar, Popconfirm } from "antd";
import {
  DeleteFilled,
  FormOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";

export const Column = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
    fixed: "left",
    width: 10,
  },
  {
    title: "Medication Name",
    dataIndex: "medicationName",
    key: "medicationName",
  },
  {
    title: "Purpose",
    dataIndex: "purpose",
    key: "purpose",
  },
  {
    title: "Dosage",
    dataIndex: "dosage",
    key: "dosage",
  },
  {
    title: "Route",
    dataIndex: "route",
    key: "route",
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    key: "frequency",
  },
];
export const columnDoc = (showModal) => [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name), // Correctly sorts alphabetically by 'name'
  },
  {
    title: "UserName",
    dataIndex: "username",
    sorter: (a, b) => a.username.localeCompare(b.username), // Correctly sorts alphabetically by 'username'
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email), // Correctly sorts alphabetically by 'email'
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
  {
    title: "Phone Number",
    dataIndex: "phonenumber",
    sorter: (a, b) => {
      const numA = parseFloat(a.phonenumber.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      const numB = parseFloat(b.phonenumber.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return numA - numB; // Sort numerically
    },
  },
  {
    title: "Hospital Details",
    dataIndex: "hospitalDetails",
    sorter: (a, b) => a.hospitalDetails.localeCompare(b.hospitalDetails), // Correctly sorts alphabetically by 'hospitalDetails'
  },
  {
    title: "View Document",
    dataIndex: "viewDocument",
    render: (_, record) => (
      <Button type="link" onClick={() => showModal(record)}>
        View
      </Button>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="flex">
        <Button
          onClick={() => handleApprove(record.key)}
          style={{ marginRight: 8 }}
        >
          Approve
        </Button>
        <Button onClick={() => handleReject(record.key)}>Reject</Button>
      </div>
    ),
  },
];

export const columnPm = (showModal) => [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name), // Correctly sorts alphabetically by 'name'
  },
  {
    title: "UserName",
    dataIndex: "username",
    sorter: (a, b) => a.username.localeCompare(b.username), // Correctly sorts alphabetically by 'username'
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email), // Correctly sorts alphabetically by 'email'
  },
  {
    title: "Gender",
    dataIndex: "gender",
    // No sorter provided, as this is likely categorical and might not need sorting
  },
  {
    title: "Phone Number",
    dataIndex: "phonenumber",
    sorter: (a, b) => {
      const numA = parseFloat(a.phonenumber.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      const numB = parseFloat(b.phonenumber.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return numA - numB; // Sort numerically
    },
  },
  {
    title: "License Information",
    dataIndex: "licenseInformation",
    sorter: (a, b) => a.licenseInformation.localeCompare(b.licenseInformation), // Correctly sorts alphabetically by 'hospitalDetails'
  },
  {
    title: "View Document",
    dataIndex: "viewDocument",
    render: (_, record) => (
      <Button type="link" onClick={() => showModal(record)}>
        View
      </Button>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="flex ">
        <Button
          onClick={() => handleApprove(record.key)}
          style={{
            marginRight: 8,
            background: "#23C560",
            color: "white",
          }}
        >
          Approve
        </Button>
        <Button
          onClick={() => handleReject(record.key)}
          style={{ background: "red", color: "white" }}
        >
          Reject
        </Button>
      </div>
    ),
  },
];

export const columnUser = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name), // Correctly sorts alphabetically by 'name'
  },
  {
    title: "UserName",
    dataIndex: "username",
    sorter: (a, b) => a.username.localeCompare(b.username), // Correctly sorts alphabetically by 'username'
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email), // Correctly sorts alphabetically by 'email'
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
  {
    title: "Profile",
    dataIndex: "profile",
    render: (_, record) => (
      <Avatar
        size={{
          xs: 24,
          sm: 32,
          md: 40,
          lg: 64,
          xl: 70,
        }}
        src={record.profilePictureUrl} // Assuming record.profilePictureUrl contains the URL of the profile picture
        alt="Profile Picture"
      />
    ),
  },

  {
    title: "Phone Number",
    dataIndex: "phonenumber",
    sorter: (a, b) => {
      const numA = parseFloat(a.phonenumber.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      const numB = parseFloat(b.phonenumber.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return numA - numB; // Sort numerically
    },
  },
  {
    title: "Role",
    dataIndex: "role",
  },

  {
    title: "Action",
    dataIndex: "active",
    key: "active",
    render: (active) => <span>{active ? "Active" : "Deactivate"}</span>,
  },
];

const maxSubcategoriesToShow = 2; // Maximum number of subcategories to display initially

export const columnCategory = (
  expandedRowKeys,
  handleExpand,
  handleEdit,
  handleDelete
) => [
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Subcategory",
    dataIndex: "subcategory",
    sorter: (a, b) => a.subcategory.localeCompare(b.subcategory),
    render: (subcategories, record) => {
      const items = subcategories.split(",").map((item) => item.trim());
      const showMore = items.length > maxSubcategoriesToShow;
      const isExpanded = expandedRowKeys.includes(record.key);

      return (
        <div>
          {items.slice(0, maxSubcategoriesToShow).join(", ")}
          {showMore && (
            <Button type="link" onClick={() => handleExpand(record.key)}>
              {isExpanded ? "Show Less" : "Show More"}
              {isExpanded ? (
                <UpOutlined style={{ fontSize: "12px" }} />
              ) : (
                <DownOutlined style={{ fontSize: "12px" }} />
              )}
            </Button>
          )}
          {isExpanded && showMore && (
            <div>{items.slice(maxSubcategoriesToShow).join(", ")}</div>
          )}
        </div>
      );
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="flex items-center justify-center gap-4">
        <FormOutlined
          style={{
            color: "white",
            fontSize: "20px",
            background: "blue",
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => handleEdit(record)}
        />
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <DeleteFilled
            style={{
              color: "white",
              fontSize: "20px",
              background: "red",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </Popconfirm>
      </div>
    ),
  },
];

export const columnPurchase = (handleEdit, handleDelete) => [
  {
    title: "Medicine Name",
    dataIndex: "medName",
    sorter: (a, b) => a.medName.localeCompare(b.medName), // Correctly sorts alphabetically by 'name'
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category), // Correctly sorts alphabetically by 'username'
  },
  {
    title: "Sub-Category",
    dataIndex: "subcategory",
    sorter: (a, b) => a.subcategory.localeCompare(b.subcategory), // Correctly sorts alphabetically by 'email'
  },
  {
    title: "Cost",
    dataIndex: "cost",
    sorter: (a, b) => {
      const numA = parseFloat(a.cost.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      const numB = parseFloat(b.cost.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return numA - numB; // Sort numerically
    },
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => {
      const numA = parseFloat(a.quantity.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      const numB = parseFloat(b.quantity.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return numA - numB; // Sort numerically
    },
  },

  {
    title: "Expire-Date",
    dataIndex: "expiredate",
    sorter: (a, b) => {
      const numA = parseFloat(a.expiredate.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      const numB = parseFloat(b.expiredate.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return numA - numB; // Sort numerically
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="flex items-center justify-center gap-4">
        <FormOutlined
          style={{
            color: "white",
            fontSize: "20px",
            background: "blue",
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => handleEdit(record)}
        />
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <DeleteFilled
            style={{
              color: "white",
              fontSize: "20px",
              background: "red",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </Popconfirm>
      </div>
    ),
  },
];

export const columnProduct = (handleEdit, handleDelete) => [
  {
    title: "Medicine Name",
    dataIndex: "medName",
    sorter: (a, b) => a.medName.localeCompare(b.medName),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Sub-Category",
    dataIndex: "subcategory",
    sorter: (a, b) => a.subcategory.localeCompare(b.subcategory),
  },
  {
    title: "Actual Price",
    dataIndex: "cost",
    sorter: (a, b) => {
      const numA = parseFloat(a.cost.replace(/[^\d.-]/g, ""));
      const numB = parseFloat(b.cost.replace(/[^\d.-]/g, ""));
      return numA - numB;
    },
  },
  {
    title: "Selling Price",
    dataIndex: "sellprice",
    sorter: (a, b) => {
      const numA = parseFloat(a.sellprice.replace(/[^\d.-]/g, ""));
      const numB = parseFloat(b.sellprice.replace(/[^\d.-]/g, ""));
      return numA - numB;
    },
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => {
      const numA = parseFloat(a.quantity.replace(/[^\d.-]/g, ""));
      const numB = parseFloat(b.quantity.replace(/[^\d.-]/g, ""));
      return numA - numB;
    },
  },

  {
    title: "Registered-Date",
    dataIndex: "registerdate",
    sorter: (a, b) => new Date(a.registerdate) - new Date(b.registerdate),
  },
  {
    title: "Expire-Date",
    dataIndex: "expiredate",
    sorter: (a, b) => new Date(a.expiredate) - new Date(b.expiredate),
  },
  {
    title: "Sold-Qty",
    dataIndex: "soldqty",
    sorter: (a, b) => {
      const numA = parseFloat(a.soldqty.replace(/[^\d.-]/g, ""));
      const numB = parseFloat(b.soldqty.replace(/[^\d.-]/g, ""));
      return numA - numB;
    },
  },
  {
    title: "Remain-Qty",
    dataIndex: "remainqty",
    sorter: (a, b) => {
      const numA = parseFloat(a.remainqty.replace(/[^\d.-]/g, ""));
      const numB = parseFloat(b.remainqty.replace(/[^\d.-]/g, ""));
      return numA - numB;
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="flex items-center justify-center gap-4">
        <FormOutlined
          style={{
            color: "white",
            fontSize: "20px",
            background: "blue",
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => handleEdit(record)}
        />
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <DeleteFilled
            style={{
              color: "white",
              fontSize: "20px",
              background: "red",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </Popconfirm>
      </div>
    ),
  },
];

export const columnPharmacist = (handleEdit, handleDelete, showModal) => [
  {
    title: " Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
  {
    title: "Phone Number",
    dataIndex: "phonenumber",
    sorter: (a, b) => {
      const numA = parseFloat(a.phonenumber.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      const numB = parseFloat(b.phonenumber.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return numA - numB; // Sort numerically
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "Address",
    dataIndex: "address",
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: "View Document",
    dataIndex: "viewDocument",
    render: (_, record) => (
      <Button type="link" onClick={() => showModal(record)}>
        View
      </Button>
    ),
  },
  {
    title: "Registered-Date",
    dataIndex: "registerdate",
    sorter: (a, b) => new Date(a.registerdate) - new Date(b.registerdate),
  },
  {
    title: "License Number",
    dataIndex: "license",
    sorter: (a, b) => {
      const numA = parseFloat(a.license.replace(/[^\d.-]/g, ""));
      const numB = parseFloat(b.license.replace(/[^\d.-]/g, ""));
      return numA - numB;
    },
  },
  {
    title: "Profile",
    dataIndex: "profile",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <div className="flex items-center justify-center gap-4">
        <FormOutlined
          style={{
            color: "white",
            fontSize: "20px",
            background: "blue",
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => handleEdit(record)}
        />
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <DeleteFilled
            style={{
              color: "white",
              fontSize: "20px",
              background: "red",
              padding: "8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </Popconfirm>
      </div>
    ),
  },
];

export const columnReport = [
  {
    title: "Medicine Name",
    dataIndex: "medname",
    sorter: (a, b) => a.medname.localeCompare(b.medname),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => {
      const numA = parseFloat(a.quantity.replace(/[^\d.-]/g, ""));
      const numB = parseFloat(b.quantity.replace(/[^\d.-]/g, ""));
      return numA - numB;
    },
  },
  {
    title: "Total Price",
    dataIndex: "totalprice",
    sorter: (a, b) => {
      const numA = parseFloat(a.totalprice.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      const numB = parseFloat(b.totalprice.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return numA - numB; // Sort numerically
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
];
