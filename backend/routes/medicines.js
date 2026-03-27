// Import Express framework
const express = require("express");

// Create a router instance for defining medicine-related routes
const router = express.Router();

// Import database connection
const connection = require("../db");

/* =========================================================
   GET: All medicines for a specific user
   Route: GET /:userid
   ========================================================= */

/**
 * This endpoint retrieves all medicines for a specific user.
 * It joins the doctors table to also include the doctor's name
 * for each medicine entry.
 * Results are ordered by start date and time.
 */
router.get("/:userid", (req, res) => {
  // Extract user ID from request URL parameters
  const userId = req.params.userid;

  // SQL query to fetch all medicines for the user
  // Includes doctor name via LEFT JOIN
  // Orders results chronologically by date and time
  const query = `
    SELECT m.*, d.name AS doctor_name
    FROM medicines m
    LEFT JOIN doctors d ON m.doctor_id = d.id
    WHERE m.user_id = ?
    ORDER BY m.start_date, m.time
  `;

  // Execute database query using parameterized input
  // This prevents SQL injection attacks
  connection.query(query, [userId], (err, results) => {
    // Handle database errors
    if (err) {
      console.error("Medicines error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Send list of medicines as JSON response
    res.json(results);
  });
});

/* =========================================================
   GET: Next medicine for dashboard
   Route: GET /:userid/next
   ========================================================= */

/**
 * This endpoint retrieves the next medicine that:
 * - belongs to the user
 * - has not been taken yet (is_taken = 0)
 * - is within the valid date range (start_date → end_date)
 * - is the closest upcoming time
 * Used mainly for dashboard display
 */
router.get("/:userid/next", (req, res) => {
  // Extract user ID from request parameters
  const userId = req.params.userid;

  // SQL query to find the next upcoming medicine
  // Filters:
  // - not taken
  // - active date range
  // Orders by time to get the nearest upcoming medicine
  const query = `
    SELECT *
    FROM medicines
    WHERE user_id = ?
      AND is_taken = 0
      AND CURDATE() BETWEEN start_date AND end_date
    ORDER BY time ASC
    LIMIT 1
  `;

  // Execute the query
  connection.query(query, [userId], (err, results) => {
    // Handle database errors
    if (err) {
      console.error("Next medicine error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Return the next medicine or null if none exists
    res.json(results[0] || null);
  });
});

/* =========================================================
   PUT: Mark medicine as taken
   Route: PUT /:id/take
   ========================================================= */

/**
 * This endpoint marks a medicine as taken.
 * It updates the `is_taken` field in the database to 1 (true)
 * This is typically triggered when the user confirms taking a medicine.
 */
router.put("/:id/take", (req, res) => {
  // Extract medicine ID from request parameters
  const medicineId = req.params.id;

  // SQL query to update medicine status
  // Sets is_taken flag to true (1)
  const query = `
    UPDATE medicines
    SET is_taken = 1
    WHERE id = ?
  `;

  // Execute the update query
  connection.query(query, [medicineId], (err, result) => {
    // Handle database errors
    if (err) {
      console.error("Take medicine error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Send success confirmation response
    res.json({ success: true });
  });
});

// Export router to be used in main server file
module.exports = router;
