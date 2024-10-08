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
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Register Pharmacist
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Firstname */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Firstname
          </label>
          <input
            type="text"
            name="firstname"
            value={formValues.firstname}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* Lastname */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lastname
          </label>
          <input
            type="text"
            name="lastname"
            value={formValues.lastname}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formValues.gender === "Male"}
              onChange={handleInputChange}
              required
              className="mr-2"
            />
            <label className="mr-4 text-gray-700">Male</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formValues.gender === "Female"}
              onChange={handleInputChange}
              required
              className="mr-2"
            />
            <label className="text-gray-700">Female</label>
          </div>
        </div>
        {/* Contact Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Information
          </label>
          <input
            type="text"
            name="contact.phone"
            placeholder="Phone"
            value={formValues.contact.phone}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
          <input
            type="email"
            name="contact.email"
            placeholder="Email"
            value={formValues.contact.email}
            onChange={handleInputChange}
            required
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* Residential Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Residential Address
          </label>
          <textarea
            name="residentialAddress"
            value={formValues.residentialAddress}
            onChange={handleInputChange}
            rows="3"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* Educational Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Educational Information
          </label>
          <input
            type="file"
            name="education"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        {/* Government-Issued ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Government-Issued ID
          </label>
          <input
            type="file"
            name="idDocument"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        {/* Graduation Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Graduation Date
          </label>
          <input
            type="date"
            name="graduationDate"
            value={formValues.graduationDate}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* License Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            License Number
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formValues.licenseNumber}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* License Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            License Expiry Date
          </label>
          <input
            type="date"
            name="licenseExpiryDate"
            value={formValues.licenseExpiryDate}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <input
            type="text"
            name="experience"
            value={formValues.experience}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 p-2"
          />
        </div>
        {/* Passport Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passport Photo
          </label>
          <input
            type="file"
            name="passportPhoto"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105"
        >
          Register Pharmacist
        </button>
      </form>
    </div>
  );
};

export default RegisterPharmacist;
