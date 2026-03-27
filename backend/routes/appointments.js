// Import Express framework
const express = require("express");

// Create a new router instance for handling route endpoints
const router = express.Router();

// Import the database connection
const connection = require("../db");

/* =========================================================
   GET: All appointments for a specific user
   Route: GET /:userid
   ========================================================= */

// This endpoint retrieves all appointments for a given user
// It uses the user ID from the URL parameter
router.get("/:userid", (req, res) => {
  // Extract user ID from request parameters
  const userId = req.params.userid;

  // SQL query to fetch appointments for the user
  // Joins the doctors table to also retrieve the doctor's name
  // Orders results by appointment date and time
  const query = `
    SELECT a.*, d.name AS doctor_name
    FROM appointments a
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE a.user_id = ?
    ORDER BY a.appointment_date, a.appointment_time
  `;

  // Execute the SQL query with userId as a parameter
  // Parameterized query helps prevent SQL injection
  connection.query(query, [userId], (err, results) => {
    // Handle database errors
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    // Send the list of appointments as JSON response
    res.json(results);
  });
});

/* =========================================================
   GET: Next upcoming appointment for a user
   Route: GET /:userid/next
   ========================================================= */

// This endpoint retrieves the next upcoming appointment
// for a specific user based on current date and time
router.get("/:userid/next", (req, res) => {
  // Extract user ID from request parameters
  const userId = req.params.userid;

  // SQL query to fetch the next future appointment
  // Combines date and time fields into a full datetime
  // Filters only future appointments (>= NOW())
  // Orders by soonest date/time and limits result to 1
  const query = `
    SELECT a.*, d.name AS doctor_name
    FROM appointments a
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE a.user_id = ? 
      AND STR_TO_DATE(CONCAT(a.appointment_date, ' ', a.appointment_time), '%Y-%m-%d %H:%i:%s') >= NOW()
    ORDER BY a.appointment_date, a.appointment_time
    LIMIT 1
  `;

  // Execute the SQL query
  connection.query(query, [userId], (err, results) => {
    // Handle database errors
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    // Return the first result (next appointment) or null if none exists
    res.json(results[0] || null);
  });
});

// Export router so it can be used in server.js
module.exports = router;
