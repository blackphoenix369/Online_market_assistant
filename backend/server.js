// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ------------------- DB Connection -------------------
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// ------------------- Models -------------------
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);
const Document = mongoose.model("Document", documentSchema);

// ------------------- Middleware -------------------
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// ------------------- Routes -------------------

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "User registration failed", details: error.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
});

// Create Document
app.post("/api/documents", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const doc = new Document({ title, content, owner: req.userId });
    await doc.save();
    res.json(doc);
  } catch (error) {
    res.status(400).json({ error: "Document creation failed", details: error.message });
  }
});

// Fetch My + Shared Documents
app.get("/api/documents", authMiddleware, async (req, res) => {
  try {
    const docs = await Document.find({
      $or: [{ owner: req.userId }, { sharedWith: req.userId }],
    }).populate("owner", "username email");
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents", details: error.message });
  }
});

// Fetch Single Document
app.get("/api/documents/:id", authMiddleware, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    if (doc.owner.toString() !== req.userId && !doc.sharedWith.includes(req.userId)) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch document", details: error.message });
  }
});

// Update Document
app.put("/api/documents/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const doc = await Document.findById(req.params.id);

    if (!doc) return res.status(404).json({ error: "Document not found" });
    if (doc.owner.toString() !== req.userId) {
      return res.status(403).json({ error: "Only owner can update" });
    }

    doc.title = title || doc.title;
    doc.content = content || doc.content;
    await doc.save();
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: "Failed to update document", details: error.message });
  }
});

// Delete Document
app.delete("/api/documents/:id", authMiddleware, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    if (doc.owner.toString() !== req.userId) {
      return res.status(403).json({ error: "Only owner can delete" });
    }

    await doc.remove();
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete document", details: error.message });
  }
});

// Share Document
app.post("/api/documents/:id/share", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    if (doc.owner.toString() !== req.userId) {
      return res.status(403).json({ error: "Only owner can share" });
    }

    if (!doc.sharedWith.includes(userId)) {
      doc.sharedWith.push(userId);
      await doc.save();
    }

    res.json({ message: "Document shared successfully", doc });
  } catch (error) {
    res.status(500).json({ error: "Failed to share document", details: error.message });
  }
});

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
