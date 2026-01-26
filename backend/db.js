// Import mysql2 library to create and manage MySQL database connections
const mysql = require("mysql2");

// Import dotenv to load environment variables from the .env file
const dotenv = require("dotenv");

// Load environment variables into process.env
dotenv.config();

// Create a MySQL database connection using values from environment variables
// This keeps sensitive data (credentials, ports) out of the source code
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Database host (e.g. localhost)
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Name of the database to connect to
  port: process.env.DB_PORT, // Port where MySQL server is running
});

// Attempt to establish a connection to the MySQL database
db.connect((err) => {
  // If there is an error during connection, log it and stop further execution
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }

  // Log a success message when the database connection is established
  console.log("✅ MySQL connected");
});

// Export the database connection so it can be used in other files
// Example: requiring this file in routes, controllers, or services
module.exports = db;
