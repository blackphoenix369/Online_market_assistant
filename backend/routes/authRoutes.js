import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = rows[0];

    if (password !== user.password) return res.status(401).json({ message: "Invalid email or password" });

    res.json({ token: "dummy-token-for-testing" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed", error: err });
  }
});

export default router;
