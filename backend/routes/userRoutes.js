import express from "express";
import {
getUserProfile,
updateUserProfile,
getArtisans,
} from "../controllers/userController.js";
const router = express.Router();
// @route GET /api/users/:user_id
// @desc Get user profile by ID
router.get("/:user_id", getUserProfile);
// @route PUT /api/users/:user_id
// @desc Update user profile
router.put("/:user_id", updateUserProfile);
// @route GET /api/users/artisans
// @desc Get list of all artisans
router.get("/artisans/list", getArtisans);
export default router;