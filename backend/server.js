import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import db from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Handle dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve frontend (for static HTML or React build)
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Default route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../frontend") });
});

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Start server + connect DB
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await db.connect();
    console.log("✅ PostgreSQL Database Connected Successfully!");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});
