const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const initializeDefaultAdmin = require("./Initialization/initializeDefaultAdmin");
const loginRoute = require("./Routes/loginRoute");
const adminRoute = require("./Routes/adminRoute");
const docRoute = require("./Routes/docRoute");
const pmRoute = require("./Routes/pmRoute");
const pharmacistRoute = require("./Routes/pharmacistRoute");
const userRoute = require("./Routes/userRoute");
const addressRoute = require("./Routes/addressRoute");
// Load environment variables from .env file
dotenv.config();

const app = express();

// Apply CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies and authentication headers
  })
);

// Middleware

app.use(cookieParser());
app.use(bodyParser.json());
//app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to MongoDB
connectDB();

// Initialize default admin
initializeDefaultAdmin()
  .then(() => {
    console.log("Default admin user initialized");
  })
  .catch((error) => {
    console.error("Error initializing default admin user:", error);
  });

// Basic Route to Check Server Status
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

//Routes
app.use("/api/login", loginRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/doctor", docRoute);
app.use("/api/pharmacy-manager", pmRoute);
app.use("/api/pharmacist", pharmacistRoute);
app.use("/api/address", addressRoute);
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
