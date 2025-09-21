import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import pool from "./database/db.js";  

dotenv.config();
const app = express();

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

// ----------------------------
// Serve static frontend (HTML, CSS, JS)
// ----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
