// backend/routes/dashboardRoutes.js
import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ---------------------
// @route   GET /api/dashboard
// @desc    Get dashboard data for logged-in user
// @access  Protected (requires JWT)
// ---------------------
router.get("/", verifyToken, getDashboard);

export default router;
