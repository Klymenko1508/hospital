// Import Express framework
const express = require("express");

// Import MySQL promise-based client
const mysql = require("mysql2/promise");

// Import bcrypt for hashing passwords
const bcrypt = require("bcrypt");

// Load environment variables
require("dotenv").config();

// Create Express router
const router = express.Router();

/* =========================================================
   DATABASE CONNECTION POOL
   ========================================================= */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

/* =========================================================
   POST: Register a new user
   Route: POST /
   ========================================================= */
router.post("/", async (req, res) => {
  try {
    // Extract fields from request body
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

    /* -------------------------
       Validate required fields
       ------------------------- */
    if (!firstName || !surname || !hospital_number || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Optional: Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    /* -------------------------
       Hash password
       ------------------------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* -------------------------
       Insert user into database
       ------------------------- */
    const query = `
      INSERT INTO users
      (firstName, surname, hospital_number, email, department_id, telephone_number, password, dob)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      firstName,
      surname,
      hospital_number,
      email,
      department_id || null, // allow optional department
      telephone_number || null, // allow optional telephone
      hashedPassword,
      dob || null, // allow optional DOB
    ]);

    /* -------------------------
       Return success
       ------------------------- */
    return res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Registration error:", err);

    /* -------------------------
       Handle duplicates
       ------------------------- */
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "User with this email or hospital number already exists",
      });
    }

    /* -------------------------
       Server error
       ------------------------- */
    return res.status(500).json({
      message: "Server error during registration",
      error: err.message,
    });
  }
});

// Export router
module.exports = router;
