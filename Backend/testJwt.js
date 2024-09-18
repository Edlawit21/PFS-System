require("dotenv").config(); // Ensure you include this line if you're using a .env file
const jwt = require("jsonwebtoken");

const payload = {
  id: "66e7666193f4692837976cc0",
  role: "pharmacist", // or any role you want to test
};

const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: "1h",
});

console.log("Generated Token:", token);
