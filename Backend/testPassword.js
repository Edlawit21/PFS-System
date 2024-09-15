{
  /*const bcrypt = require("bcryptjs");

const generateHash = async () => {
  try {
    const password = "@Bbb_12";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Generated hash:", hashedPassword);

    // Call testPassword here for comparison after generating a new hash
    await testPassword(password, hashedPassword);
  } catch (error) {
    console.error("Error generating hash:", error);
  }
};

const testPassword = async (password, storedHash) => {
  try {
    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, storedHash);

    // Print the result
    console.log("Password match:", isMatch);
  } catch (error) {
    console.error("Error during password comparison:", error);
  }
};

// Generate a new hash and test the password
generateHash();*/
}

const bcrypt = require("bcryptjs");

// Hardcoded plain password and hashed password from database
const plainPassword = "@Bbb_12"; // Replace with the plain password you're testing
const hashedPassword =
  "$2a$10$Ssu8Byyo.H8s/lL.nJvaheIrulJExnIxtW/8gY/OqfdOM085Nd.T."; // Replace with the hashed password from your database

// Function to test password match
async function testPasswordMatch(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log("Password match:", isMatch);
    if (isMatch) {
      console.log("The passwords match!");
    } else {
      console.log("The passwords do not match.");
    }
  } catch (error) {
    console.error("Error during password comparison:", error);
  }
}

// Call the function to test
testPasswordMatch(plainPassword, hashedPassword);
