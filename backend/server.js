// backend/server.js
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.get("/api", (req, res) => {
  res.json({ message: "✅ Online Market Assistant API is working!" });
});

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Online Market Assistant API Running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
