import { Button, Popconfirm } from "antd";
import {
  DeleteFilled,
  FormOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";

export const Column = [
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
export const columnDoc = (showModal, handleApprove, handleReject) => [
  {
    title: "Name",
    dataIndex: "docName",
    sorter: (a, b) => a.docName.localeCompare(b.docName), // Correct sorting for 'docName'
  },
  {
    title: "UserName",
    dataIndex: ["user", "username"], // Accessing nested 'username'
    sorter: (a, b) => a.user.username.localeCompare(b.user.username),
  },
  {
    title: "Email",
    dataIndex: ["user", "email"], // Correctly accessing nested 'email'
    sorter: (a, b) => a.user.email.localeCompare(b.user.email),
  },
  {
    title: "Gender",
    dataIndex: ["user", "gender"], // Adjusted to access nested 'gender'
  },
  {
    title: "Phone Number",
    dataIndex: ["user", "phoneNumber"], // Adjusted to access nested 'phoneNumber'
    sorter: (a, b) => {
      const numA = parseFloat(a.user.phoneNumber.replace(/[^\d.-]/g, "")); // Adjusted to access nested 'phoneNumber'
      const numB = parseFloat(b.user.phoneNumber.replace(/[^\d.-]/g, "")); // Adjusted to access nested 'phoneNumber'
      return numA - numB;
    },
  },
  {
    title: "Hospital Details",
    dataIndex: "hospitalName", // Update if needed
    sorter: (a, b) => a.hospitalName.localeCompare(b.hospitalName),
  },
  {
    title: "View Document",
    dataIndex: "educationalInfo", // Update if needed
    render: (_, record) => (
      <Button
        type="link"
        onClick={() => showModal(record)}
        key={`view-${record.id}`}
      >
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
          onClick={() => handleApprove(record._id)}
          key={`approve-${record.id}`} // Use record._id
          style={{ marginRight: 8 }}
        >
          Approve
        </Button>
        <Button
          onClick={() => handleReject(record._id)}
          key={`reject-${record.id}`}
        >
          Reject
        </Button>
      </div>
    ),
  },
];

export const columnPm = (showModal) => [
  {
    title: "Name",
    dataIndex: "pmName",
    sorter: (a, b) => a.name.localeCompare(b.name), // Correctly sorts alphabetically by 'name'
  },
  {
    title: "UserName",
    dataIndex: ["user", "username"], // Accessing nested 'username'
    sorter: (a, b) => a.user.username.localeCompare(b.user.username),
  },
  {
    title: "Email",
    dataIndex: ["user", "email"], // Correctly accessing nested 'email'
    sorter: (a, b) => a.user.email.localeCompare(b.user.email),
  },
  {
    title: "Gender",
    dataIndex: ["user", "gender"], // Adjusted to access nested 'gender'
  },
  {
    title: "Phone Number",
    dataIndex: ["user", "phoneNumber"], // Adjusted to access nested 'phoneNumber'
    sorter: (a, b) => {
      const numA = parseFloat(a.user.phoneNumber.replace(/[^\d.-]/g, "")); // Adjusted to access nested 'phoneNumber'
      const numB = parseFloat(b.user.phoneNumber.replace(/[^\d.-]/g, "")); // Adjusted to access nested 'phoneNumber'
      return numA - numB;
    },
  },
  {
    title: "License Information",
    dataIndex: "licensePM",
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
    title: "User ID",
    dataIndex: "_id", // Ensure you have the correct key for user ID
    key: "_id",
  },

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
    /*
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
  */
  },

  {
    title: "Status",
    dataIndex: "status",
  },

  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
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
    dataIndex: "status",
    key: "action",
    render: (text, record) => {
      console.log("Rendering record:", record); // Log the record for debugging

      if (record.status === "Active") {
        return (
          <Button
            onClick={() => handleToggle(record._id, record.status)} // Change from record.userId to record._id
          >
            Deactivate
          </Button>
        );
      } else if (record.status === "Inactive") {
        return (
          <Button
            onClick={() => handleToggle(record._id, record.status)} // Change from record.userId to record._id
          >
            Activate
          </Button>
        );
      } else if (record.status === "Pending") {
        return <span>Pending</span>; // Display pending without a button
      }
      return null; // Return null if no action is needed
    },
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

{
  /*export const columnPurchase = (handleEdit, handleDelete) => [
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
];*/
}

export const columnProduct = (handleEdit, handleDelete) => [
  {
    title: "Medicine Name",
    dataIndex: "medname",
    sorter: (a, b) => a.medname.localeCompare(b.medname),
  },
  {
    title: "Category",
    dataIndex: ["category", "category"],
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Sub-Category",
    dataIndex: ["category", "subcategory"],
    sorter: (a, b) => a.subcategory.localeCompare(b.subcategory),
  },
  {
    title: "Actual Price",
    dataIndex: "actualPrice", // Match the key from fetched data
    sorter: (a, b) => a.actualPrice - b.actualPrice,
  },
  {
    title: "Selling Price",
    dataIndex: "sellPrice", // Match the key from fetched data
    sorter: (a, b) => a.sellPrice - b.sellPrice,
  },
  {
    title: "Quantity",
    dataIndex: "quantity", // Match the key from fetched data
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Registered-Date",
    dataIndex: "registerDate", // Match the key from fetched data
    sorter: (a, b) => new Date(a.registerDate) - new Date(b.registerDate),
  },
  {
    title: "Expire-Date",
    dataIndex: "expireDate", // Match the key from fetched data
    sorter: (a, b) => new Date(a.expireDate) - new Date(b.expireDate),
  },
  {
    title: "Sold-Qty",
    dataIndex: "soldQty", // Match the key from fetched data
    sorter: (a, b) => a.soldQty - b.soldQty,
  },
  {
    title: "Remain-Qty",
    dataIndex: "remainQty", // Match the key from fetched data
    sorter: (a, b) => a.remainQty - b.remainQty,
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
    title: "Name",
    dataIndex: "name",
    render: (_, record) => `${record.firstname} ${record.lastname}`, // Combine firstname and lastname
    sorter: (a, b) =>
      `${a.firstname} ${a.lastname}`.localeCompare(
        `${b.firstname} ${b.lastname}`
      ),
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
  {
    title: "Phone Number",
    dataIndex: ["contact", "phone"], // Accessing phone number from nested contact field
    sorter: (a, b) => {
      const numA = parseFloat(a.contact.phone.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      const numB = parseFloat(b.contact.phone.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return numA - numB; // Sort numerically
    },
  },
  {
    title: "Email",
    dataIndex: ["contact", "email"], // Accessing email from nested contact field
    sorter: (a, b) => a.contact.email.localeCompare(b.contact.email),
  },
  {
    title: "Username",
    dataIndex: "username",
    sorter: (a, b) => a.username.localeCompare(b.username),
  },
  {
    title: "Address",
    dataIndex: "residentialAddress", // Assuming this is the field for the address
    sorter: (a, b) => a.residentialAddress.localeCompare(b.residentialAddress),
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
    title: "Registered Date",
    dataIndex: "createdAt", // Use 'createdAt' which is the registration date
    key: "createdAt",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // Sorting based on date
    render: (date) => new Date(date).toLocaleDateString(), // Format date for display
  },
  {
    title: "License Number",
    dataIndex: "licenseNumber", // Assuming this is the field for the license number
    sorter: (a, b) => {
      const numA = parseFloat(a.licenseNumber.replace(/[^\d.-]/g, ""));
      const numB = parseFloat(b.licenseNumber.replace(/[^\d.-]/g, ""));
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
          onClick={() => handleEdit(record)} // Call handleEdit with the record
        />
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)} // Call handleDelete with the record key
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

export const columnAdminPharmacist = () => [
  {
    title: "Name",
    dataIndex: "firstname", // Use firstname as dataIndex
    render: (text, record) => `${record.firstname} ${record.lastname}`, // Concatenate first and last names
    sorter: (a, b) => a.firstname.localeCompare(b.firstname), // Sort by firstname
  },
  {
    title: "Gender",
    dataIndex: "gender",
    sorter: (a, b) => a.gender.localeCompare(b.gender), // Add sorting for gender if needed
  },
  {
    title: "Phone Number",
    dataIndex: ["contact", "phone"], // Access phone from the contact object
    sorter: (a, b) => {
      const numA = parseFloat(a.contact.phone.replace(/[^\d.-]/g, ""));
      const numB = parseFloat(b.contact.phone.replace(/[^\d.-]/g, ""));
      return numA - numB;
    },
  },
  {
    title: "Email",
    dataIndex: ["contact", "email"], // Access email from the contact object
    sorter: (a, b) => a.contact.email.localeCompare(b.contact.email),
  },
  {
    title: "Address",
    dataIndex: "residentialAddress", // Use residentialAddress as dataIndex
    sorter: (a, b) => a.residentialAddress.localeCompare(b.residentialAddress),
  },
  {
    title: "Registered-Date",
    dataIndex: "createdAt", // Use createdAt timestamp for registration date
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
  {
    title: "License Number",
    dataIndex: "licenseNumber", // Use licenseNumber as dataIndex
    sorter: (a, b) => a.licenseNumber.localeCompare(b.licenseNumber),
  },
  {
    title: "Created By",
    dataIndex: "createdBy", // This assumes createdBy is populated correctly
    render: (text, record) => {
      const createdBy = record.createdBy?.firstname
        ? `${record.createdBy.firstname} ${record.createdBy.lastname}`
        : "Unknown"; // Fallback to 'Unknown' if createdBy is null
      return createdBy;
    },
  },
];

export const columnReport = [
  {
    title: "Medicine Name",
    dataIndex: "medicineName",
    sorter: (a, b) => a.medicineName.localeCompare(b.medicineName),
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
    dataIndex: "totalPrice",
    sorter: (a, b) => {
      const numA = parseFloat(a.totalPrice); // Use totalPrice
      const numB = parseFloat(b.totalPrice); // Use totalPrice
      return numA - numB; // Sort numerically
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
];
