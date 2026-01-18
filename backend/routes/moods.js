// routes/moods.js
const express = require("express");
const router = express.Router();
const connection = require("../db");

/**
 * GET all moods (for mood selection)
 * Example: GET /api/moods
 */
router.get("/", (req, res) => {
  const query = "SELECT * FROM moods ORDER BY id";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Cannot load moods:", err);
      return res.status(500).json({ error: "Cannot load moods" });
    }
    res.json(results);
  });
});

/**
 * GET today's mood for a user
 * Example: GET /api/moods/11/today
 */
router.get("/:userId/today", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT um.*, m.emoji_filename, m.label, m.encouragement_title, m.encouragement_text
    FROM user_moods um
    JOIN moods m ON um.mood_id = m.id
    WHERE um.user_id = ? AND um.mood_date = CURDATE()
    LIMIT 1
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Cannot load today's mood:", err);
      return res.status(500).json({ error: "Cannot load today's mood" });
    }

    res.json(results[0] || null);
  });
});

/**
 * POST mood for today (insert or update)
 * Example: POST /api/moods/11
 * Body: { mood_id: 3 }
 */
router.post("/:userId", (req, res) => {
  const userId = req.params.userId;
  const { mood_id } = req.body;

  if (!mood_id) {
    return res.status(400).json({ error: "Mood ID is required" });
  }

  // Insert or update today's mood
  const query = `
    INSERT INTO user_moods (user_id, mood_id, mood_date)
    VALUES (?, ?, CURDATE())
    ON DUPLICATE KEY UPDATE mood_id = VALUES(mood_id), created_at = CURRENT_TIMESTAMP
  `;

  connection.query(query, [userId, mood_id], (err, result) => {
    if (err) {
      console.error("Cannot save mood:", err);
      return res.status(500).json({ error: "Cannot save mood" });
    }

    // Return the full mood data after saving
    const selectQuery = `
      SELECT um.*, m.emoji_filename, m.label, m.encouragement_title, m.encouragement_text
      FROM user_moods um
      JOIN moods m ON um.mood_id = m.id
      WHERE um.user_id = ? AND um.mood_date = CURDATE()
      LIMIT 1
    `;

    connection.query(selectQuery, [userId], (err2, results) => {
      if (err2) {
        console.error("Cannot load mood after saving:", err2);
        return res.status(500).json({ error: "Cannot load mood after saving" });
      }

      res.json(results[0] || null);
    });
  });
});

module.exports = router;
