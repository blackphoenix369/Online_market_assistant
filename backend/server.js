import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import pool from "./database/db.js";
import fs from "fs";

dotenv.config();
const app = express();

// ----------------------------
// Middleware
// ----------------------------
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));

// ----------------------------
// API Routes
// ----------------------------
app.use("/api/auth", authRoutes);

// ----------------------------
// Serve frontend
// ----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try common frontend paths
const possibleFrontendPaths = [
  path.join(__dirname, "../frontend"), // root/frontend
  path.join(__dirname, "frontend")     // backend/frontend
];

let frontendPath = possibleFrontendPaths.find(p => fs.existsSync(p));

if (!frontendPath) {
  console.warn("⚠️ Frontend folder not found! Please ensure frontend exists.");
} else {
  console.log("✅ Frontend folder found at:", frontendPath);
  app.use(express.static(frontendPath));
  app.get("*", (req, res, next) => {
    const indexFile = path.join(frontendPath, "index.html");
    if (fs.existsSync(indexFile)) {
      res.sendFile(indexFile);
    } else {
      next(new Error("index.html not found in frontend folder"));
    }
  });
}

// ----------------------------
// Error handling
// ----------------------------
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// ----------------------------
// Start server after DB check
// ----------------------------
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    const res = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Database connected, test result:", res.rows[0].result);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Access your app at your Render URL`);
    });
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
})();
