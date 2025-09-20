import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js"; // your auth routes

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Fix for ES module dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Default route → login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// ✅ Extra routes for your HTML pages
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dashboard.html"));
});

app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "product.html"));
});

app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "order.html"));
});

// ✅ API routes
app.use("/api/auth", authRoutes);

// ✅ Fallback route (for unknown paths → send index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
