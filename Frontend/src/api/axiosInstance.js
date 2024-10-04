import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/api", // Update this with your backend server URL
  withCredentials: true, // Allows sending cookies with the request
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
});

// Add an interceptor to include the token in the Authorization header
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    console.log("Token in interceptor:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default Api;
