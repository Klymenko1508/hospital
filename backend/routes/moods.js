// routes/moods.js

// Import Express framework
const express = require("express");

// Create a router instance for mood-related routes
const router = express.Router();

// Import database connection
const connection = require("../db");

/* =========================================================
   GET: All available moods
   Route: GET /api/moods
   ========================================================= */

/**
 * This endpoint returns all moods from the database.
 * It is mainly used for mood selection in the frontend UI
 * (e.g. showing emoji options for the user to choose from).
 *
 * Example request:
 * GET /api/moods
 */
router.get("/", (req, res) => {
  // SQL query to fetch all moods ordered by ID
  const query = "SELECT * FROM moods ORDER BY id";

  // Execute query
  connection.query(query, (err, results) => {
    // Handle database errors
    if (err) {
      console.error("Cannot load moods:", err);
      return res.status(500).json({ error: "Cannot load moods" });
    }

    // Send moods list as JSON response
    res.json(results);
  });
});

/* =========================================================
   GET: Today's mood for a user
   Route: GET /api/moods/:userId/today
   ========================================================= */

/**
 * This endpoint retrieves today's mood for a specific user.
 * It joins the moods table to return full mood details such as:
 * - emoji file
 * - label
 * - encouragement title
 * - encouragement text
 *
 * Example request:
 * GET /api/moods/11/today
 */
router.get("/:userId/today", (req, res) => {
  // Extract user ID from URL parameters
  const userId = req.params.userId;

  // SQL query to get today's mood for the user
  // Joins user_moods with moods to get full mood information
  // Filters by current date (CURDATE())
  const query = `
    SELECT um.*, m.emoji_filename, m.label, m.encouragement_title, m.encouragement_text
    FROM user_moods um
    JOIN moods m ON um.mood_id = m.id
    WHERE um.user_id = ? AND um.mood_date = CURDATE()
    LIMIT 1
  `;

  // Execute the query
  connection.query(query, [userId], (err, results) => {
    // Handle database errors
    if (err) {
      console.error("Cannot load today's mood:", err);
      return res.status(500).json({ error: "Cannot load today's mood" });
    }

    // Return today's mood or null if none exists
    res.json(results[0] || null);
  });
});

/* =========================================================
   POST: Save today's mood (insert or update)
   Route: POST /api/moods/:userId
   ========================================================= */

/**
 * This endpoint saves the user's mood for today.
 * If a mood already exists for today, it updates it.
 * If not, it inserts a new record.
 *
 * Example request:
 * POST /api/moods/11
 * Body: { mood_id: 3 }
 */
router.post("/:userId", (req, res) => {
  // Extract user ID from URL parameters
  const userId = req.params.userId;

  // Extract mood ID from request body
  const { mood_id } = req.body;

  // Validate input
  if (!mood_id) {
    return res.status(400).json({ error: "Mood ID is required" });
  }

  /* -------------------------
     Insert or update mood
     ------------------------- */

  // SQL query to insert today's mood
  // If a record already exists for today, it updates the mood instead
  // This avoids duplicate records for the same day
  const query = `
    INSERT INTO user_moods (user_id, mood_id, mood_date)
    VALUES (?, ?, CURDATE())
    ON DUPLICATE KEY UPDATE mood_id = VALUES(mood_id), created_at = CURRENT_TIMESTAMP
  `;

  // Execute insert/update query
  connection.query(query, [userId, mood_id], (err, result) => {
    // Handle database errors
    if (err) {
      console.error("Cannot save mood:", err);
      return res.status(500).json({ error: "Cannot save mood" });
    }

    /* -------------------------
       Load saved mood
       ------------------------- */

    // After saving, fetch the full mood data to return to frontend
    const selectQuery = `
      SELECT um.*, m.emoji_filename, m.label, m.encouragement_title, m.encouragement_text
      FROM user_moods um
      JOIN moods m ON um.mood_id = m.id
      WHERE um.user_id = ? AND um.mood_date = CURDATE()
      LIMIT 1
    `;

    // Execute select query
    connection.query(selectQuery, [userId], (err2, results) => {
      // Handle database errors
      if (err2) {
        console.error("Cannot load mood after saving:", err2);
        return res.status(500).json({ error: "Cannot load mood after saving" });
      }

      // Return full mood object
      res.json(results[0] || null);
    });
  });
});

// Export router for use in server.js
module.exports = router;
