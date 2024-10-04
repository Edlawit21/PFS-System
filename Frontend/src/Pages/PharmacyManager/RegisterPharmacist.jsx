import { useState } from "react";
import Api from "../../api/axiosInstance";

const RegisterPharmacist = () => {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    contact: { phone: "", email: "" },
    residentialAddress: "",
    education: null,
    idDocument: null,
    graduationDate: "",
    licenseNumber: "",
    licenseExpiryDate: "",
    experience: "",
    passportPhoto: null,
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("contact.")) {
      setFormValues((prevState) => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormValues((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in formValues) {
      if (
        key === "education" ||
        key === "idDocument" ||
        key === "passportPhoto"
      ) {
        formData.append(key, formValues[key]); // Append files or other fields
      } else if (key === "contact") {
        // Stringify contact object and append as a single JSON field
        formData.append("contact", JSON.stringify(formValues.contact));
      } else {
        formData.append(key, formValues[key]); // Append other fields normally
      }
    }

    // Debugging: Print formData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await Api.post("/pharmacist/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Pharmacist registered successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error registering pharmacist:", error);
      alert("Failed to register pharmacist. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Register Pharmacist</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Firstname:
          </label>
          <input
            type="text"
            name="firstname"
            value={formValues.firstname}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Lastname:
          </label>
          <input
            type="text"
            name="lastname"
            value={formValues.lastname}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formValues.gender === "Male"}
              onChange={handleInputChange}
              required
              className="mr-2"
            />
            <label className="mr-4">Male</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formValues.gender === "Female"}
              onChange={handleInputChange}
              required
              className="mr-2"
            />
            <label>Female</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact Information:
          </label>
          <input
            type="text"
            name="contact.phone"
            placeholder="Phone"
            value={formValues.contact.phone}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
          <input
            type="email"
            name="contact.email"
            placeholder="Email"
            value={formValues.contact.email}
            onChange={handleInputChange}
            required
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Residential Address:
          </label>
          <textarea
            name="residentialAddress"
            value={formValues.residentialAddress}
            onChange={handleInputChange}
            rows="3"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Educational Information:
          </label>
          <input
            type="file"
            name="education"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Government-Issued ID:
          </label>
          <input
            type="file"
            name="idDocument"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Graduation Date:
          </label>
          <input
            type="date"
            name="graduationDate"
            value={formValues.graduationDate}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            License Number:
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formValues.licenseNumber}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            License Expiry Date:
          </label>
          <input
            type="date"
            name="licenseExpiryDate"
            value={formValues.licenseExpiryDate}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Experience:
          </label>
          <input
            type="text"
            name="experience"
            value={formValues.experience}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Passport Photo:
          </label>
          <input
            type="file"
            name="passportPhoto"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
        >
          Register Pharmacist
        </button>
      </form>
    </div>
  );
};

export default RegisterPharmacist;
