const express = require("express");
const router = express.Router();
const connection = require("../db");

/**
 * Get all medicines for a user
 */
router.get("/:userid", (req, res) => {
  const userId = req.params.userid;

  const query = `
    SELECT m.*, d.name AS doctor_name
    FROM medicines m
    LEFT JOIN doctors d ON m.doctor_id = d.id
    WHERE m.user_id = ?
    ORDER BY m.start_date, m.time
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Medicines error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

/**
 * Get next medicine (dashboard tile)
 */
router.get("/:userid/next", (req, res) => {
  const userId = req.params.userid;

  const query = `
    SELECT *
    FROM medicines
    WHERE user_id = ?
      AND is_taken = 0
      AND CURDATE() BETWEEN start_date AND end_date
    ORDER BY time ASC
    LIMIT 1
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Next medicine error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results[0] || null);
  });
});
/**
 * Mark a medicine as taken
 */
router.put("/:id/take", (req, res) => {
  const medicineId = req.params.id;

  const query = `
    UPDATE medicines
    SET is_taken = 1
    WHERE id = ?
  `;

  connection.query(query, [medicineId], (err, result) => {
    if (err) {
      console.error("Take medicine error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true });
  });
});

module.exports = router;
