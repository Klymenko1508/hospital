// Import Express framework
const express = require("express");

// Import mysql2 promise-based API for async/await database queries
const mysql = require("mysql2/promise");

// Import bcrypt for password hashing and comparison
const bcrypt = require("bcrypt");

// Import file system module to read JSON files
const fs = require("fs");

// Import path module for safe file path handling
const path = require("path");

// Load environment variables from .env file
require("dotenv").config();

// Create Express router instance
const router = express.Router();

/* =========================================================
   LOAD STATIC DATA
   ========================================================= */

// Load departments data from JSON file
// This is used to map department_id to department details
const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, "json", "departments.json"), "utf8")
);

/* =========================================================
   DATABASE CONNECTION POOL
   ========================================================= */

// Create a MySQL connection pool
// Pooling allows multiple queries to run efficiently
const db = mysql.createPool({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  port: process.env.DB_PORT, // Database port
});

/* =========================================================
   POST: Login user with buddy selection
   Route: POST /
   ========================================================= */

// This endpoint handles user login
// It authenticates the user and returns user data, department info,
// and the selected hospital buddy
router.post("/", async (req, res) => {
  try {
    /* -------------------------
       STEP 1: Extract request data
       ------------------------- */

    // Extract hospital number, password, and selected buddy ID from request body
    const { hospital_number, password, buddy_id } = req.body;

    // Validate required fields
    if (!hospital_number || !password || !buddy_id) {
      return res.status(400).json({ message: "Missing credentials or buddy" });
    }

    /* -------------------------
       STEP 2: Find user in database
       ------------------------- */

    // Query database for user by hospital number
    const [rows] = await db.query(
      "SELECT * FROM users WHERE hospital_number = ? LIMIT 1",
      [hospital_number]
    );

    // If user does not exist, return error
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract user record
    const user = rows[0];

    /* -------------------------
       STEP 3: Verify password
       ------------------------- */

    // Compare plain password with hashed password from database
    const validPassword = await bcrypt.compare(password, user.password);

    // If password is incorrect, deny access
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    /* -------------------------
       STEP 4: Department lookup
       ------------------------- */

    // Find department details using department_id from user record
    // Fallback to default values if not found
    const department = departments.find((d) => d.id === user.department_id) || {
      name: "Unknown",
      details: "No details available",
    };

    /* -------------------------
       STEP 5: Fetch selected buddy
       ------------------------- */

    // Query database for selected hospital buddy
    const [buddyRows] = await db.query(
      "SELECT * FROM hospital_buddies WHERE id = ? LIMIT 1",
      [buddy_id]
    );

    // Validate buddy existence
    if (buddyRows.length === 0) {
      return res.status(400).json({ message: "Invalid hospital buddy" });
    }

    // Extract buddy record
    const buddy = buddyRows[0];

    /* -------------------------
       STEP 6: Remove sensitive data
       ------------------------- */

    // Remove password field from user object before sending response
    const { password: pwd, ...safeUser } = user;

    /* -------------------------
       STEP 7: Send response
       ------------------------- */

    // Send all required data to frontend
    // Includes user info, department info, and buddy info
    return res.status(200).json({
      message: "Login successful",
      user: {
        ...safeUser,
        department,
      },
      buddy,
    });
  } catch (err) {
    // Handle unexpected server errors
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Export router for use in server.js
module.exports = router;
