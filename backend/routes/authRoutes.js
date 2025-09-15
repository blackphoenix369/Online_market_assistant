import express from "express";
import pool from "../database/db.js"; // updated import to pool

const router = express.Router();

// ✅ Register user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error("❌ Error inserting user:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// ✅ Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("❌ Error logging in:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

export default router;
