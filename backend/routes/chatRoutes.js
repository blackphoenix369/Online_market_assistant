import express from "express";
import { sendMessage } from "../controllers/chatController.js";
const router = express.Router();
// @route POST /api/chat/send
// @desc Send a message to customer via WhatsApp
router.post("/send", sendMessage);
export default router;