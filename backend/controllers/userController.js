// backend/controllers/userController.js
import pool from "../database/db.js";

// ----------------------------
// Get user profile by ID
// ----------------------------
export const getUserProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      "SELECT user_id, name, email, role, created_at FROM users WHERE user_id = $1",
      [user_id]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("❌ Database error:", err.message);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

// ----------------------------
// Update profile info
// ----------------------------
export const updateUserProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, email } = req.body;

    await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE user_id = $3",
      [name, email, user_id]
    );

    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error("❌ Database error:", err.message);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// ----------------------------
// Get all artisans
// ----------------------------
export const getArtisans = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT user_id, name, email, created_at FROM users WHERE role = 'artisan'"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Database error:", err.message);
    res.status(500).json({ error: "Failed to fetch artisans" });
  }
};
