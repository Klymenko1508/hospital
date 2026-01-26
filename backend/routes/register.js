// Import Express framework
const express = require("express");

// Import MySQL promise-based client for async/await queries
const mysql = require("mysql2/promise");

// Import bcrypt for hashing passwords securely
const bcrypt = require("bcrypt");

// Load environment variables from .env file
require("dotenv").config();

// Create Express router instance for user registration routes
const router = express.Router();

/* =========================================================
   DATABASE CONNECTION POOL
   ========================================================= */

// Create a MySQL connection pool
// Using a pool improves performance by reusing database connections
const db = mysql.createPool({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  port: process.env.DB_PORT, // Database port
});

/* =========================================================
   POST: Register a new user
   Route: POST /
   ========================================================= */

/**
 * This endpoint registers a new user in the system.
 * Steps:
 * 1. Validate required fields
 * 2. Hash the password securely using bcrypt
 * 3. Insert the new user into the database
 * 4. Handle duplicate entries (email or hospital number)
 * 5. Return success or error response
 *
 * Example request body:
 * {
 *   firstName: "John",
 *   surname: "Doe",
 *   hospital_number: "H12345",
 *   email: "john@example.com",
 *   department_id: 2,
 *   telephone_number: "1234567890",
 *   password: "securepassword",
 *   dob: "1990-01-01"
 * }
 */
router.post("/", async (req, res) => {
  try {
    // Extract user registration fields from request body
    const {
      firstName,
      surname,
      hospital_number,
      email,
      department_id,
      telephone_number,
      password,
      dob,
    } = req.body;

    // Validate that required fields are provided
    if (!firstName || !surname || !hospital_number || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    /* -------------------------
       Hash password
       ------------------------- */

    // Hash the plain password using bcrypt with 10 salt rounds
    // This ensures passwords are stored securely in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    /* -------------------------
       Insert user into database
       ------------------------- */

    // SQL query to insert new user with parameterized values
    const query = `
      INSERT INTO users 
      (firstName, surname, hospital_number, email, department_id, telephone_number, password, dob)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the query with provided user data
    await db.query(query, [
      firstName,
      surname,
      hospital_number,
      email,
      department_id,
      telephone_number,
      hashedPassword,
      dob,
    ]);

    // Return success response
    return res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    // Log any unexpected errors
    console.error("Registration error:", err);

    /* -------------------------
       Handle duplicate entries
       ------------------------- */

    // MySQL error code ER_DUP_ENTRY indicates a unique constraint violation
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "User with this email or hospital number already exists",
      });
    }

    // Handle other server errors
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
});

// Export router for use in server.js
module.exports = router;
