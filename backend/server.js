import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

// -------------------------------
// API Routes
// -------------------------------
app.use("/api/auth", authRoutes);

// -------------------------------
// Static Frontend
// -------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend from backend/frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Default → index.html (login)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Dashboard route
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dashboard.html"));
});

// Product route
app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "product.html"));
});

// Orders route
app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "order.html"));
});

// -------------------------------
// Start server
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
