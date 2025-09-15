import express from "express";
const router = express.Router();

// Example payment route (you can expand later with Stripe, Razorpay, etc.)
router.post("/checkout", (req, res) => {
  res.json({ message: "Payment route working! Integration pending." });
});

export default router;
