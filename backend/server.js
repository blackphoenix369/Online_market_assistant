import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import pool from "./database/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));

// API routes
app.use("/api/auth", authRoutes);

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../frontend");

app.use(express.static(frontendPath));
app.get("*", (req, res, next) => {
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) next(err);
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start server after DB check
const PORT = process.env.PORT || 8080;
(async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Database connected, test result:", rows[0].result);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Access your app at your Render URL`);
    });
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
})();
