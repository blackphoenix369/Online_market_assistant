import express from "express";
import db from "./database/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// Serve frontend static files
app.use(express.static("frontend"));

// Default route (login page)
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "frontend" });
});

// Routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await db.connect(); // connect to MySQL
    console.log("✅ MySQL Database Connected Successfully!");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});
