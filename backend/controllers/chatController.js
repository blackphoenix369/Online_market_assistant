// backend/controllers/chatController.js
const axios = require("axios");

const WHATSAPP_API_URL = "https://graph.facebook.com/v17.0";
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN; // from Meta app

module.exports = {
  // Send a message to customer
  sendMessage: async (req, res) => {
    try {
      const { to, message } = req.body;

      await axios.post(
        `${WHATSAPP_API_URL}/YOUR_PHONE_NUMBER_ID/messages`,
        {
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: message },
        },
        {
          headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
        }
      );

      res.json({ message: "Message sent successfully!" });
    } catch (err) {
      console.error(err.response?.data || err);
      res.status(500).json({ error: "Failed to send WhatsApp message" });
    }
  },

  // Order update notification
  sendOrderUpdate: async (customerPhone, orderStatus) => {
    try {
      await axios.post(
        `${WHATSAPP_API_URL}/YOUR_PHONE_NUMBER_ID/messages`,
        {
          messaging_product: "whatsapp",
          to: customerPhone,
          type: "text",
          text: { body: `Your order status is now: ${orderStatus}` },
        },
        {
          headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
        }
      );
    } catch (err) {
      console.error("Failed to send order update:", err.response?.data || err);
    }
  },
};
