// Import Express framework
const express = require("express");

// Create a new router instance for handling API routes
const router = express.Router();

// Import database connection
const db = require("../db");

/* =========================================================
   GET: Fetch all hospital buddies
   Route: GET /
   ========================================================= */

// This endpoint retrieves all records from the hospital_buddies table
// It is used to return the full list of buddies available in the system
router.get("/", (req, res) => {
  // SQL query to fetch all buddy records
  const sql = "SELECT * FROM hospital_buddies";

  // Execute the database query
  db.query(sql, (err, results) => {
    // Handle database errors
    if (err) {
      console.error("❌ Buddy fetch error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Send fetched buddy data as JSON response
    res.json(results);
  });
});

// Export router so it can be used in server.js
module.exports = router;
