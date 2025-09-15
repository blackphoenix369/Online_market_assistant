// backend/routes/analyticsRoutes.js

import express from "express";
import { getAnalyticsDashboard } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/dashboard", getAnalyticsDashboard);

export default router;
