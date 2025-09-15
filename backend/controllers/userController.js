// backend/controllers/userController.js
const db = require("../database/db");

module.exports = {
  // Get user profile by ID
  getUserProfile: async (req, res) => {
    try {
      const { user_id } = req.params;

      const users = await db.query(
        "SELECT user_id, name, email, role, created_at FROM users WHERE user_id = ?",
        [user_id]
      );

      if (users.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(users[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  },

  // Update profile info
  updateUserProfile: async (req, res) => {
    try {
      const { user_id } = req.params;
      const { name, email } = req.body;

      await db.query(
        "UPDATE users SET name = ?, email = ? WHERE user_id = ?",
        [name, email, user_id]
      );

      res.json({ message: "Profile updated successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update profile" });
    }
  },

  // Get all artisans
  getArtisans: async (req, res) => {
    try {
      const artisans = await db.query(
        "SELECT user_id, name, email, created_at FROM users WHERE role = 'artisan'"
      );

      res.json(artisans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch artisans" });
    }
  },
};
