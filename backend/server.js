import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import pool from "./database/db.js";

dotenv.config();
const app = express();

// ----------------------------
// Middleware
// ----------------------------
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
// app.use(helmet()); // optional

// ----------------------------
// API routes
// ----------------------------
app.use("/api/auth", authRoutes);

// ----------------------------
// Serve static frontend
// ----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ----------------------------
// Error Handling
// ----------------------------
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ----------------------------
// Start server after DB check
// ----------------------------
//const PORT = process.env.PORT || 8080;

(async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Database connected, test result:", rows[0].result);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running locally at http://localhost:${PORT}`);
});

  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
})();
