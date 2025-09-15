import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js"; // your auth routes

dotenv.config();
const app = express();
app.use(express.json());

// ✅ To get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Default route (login page)
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../frontend") });
});

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
