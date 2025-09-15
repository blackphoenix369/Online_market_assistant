// backend/controllers/analyticsController.js

import Order from "../database/models/Order.js";
import Product from "../database/models/Product.js";
import User from "../database/models/User.js";

// Controller function
export const getAnalyticsDashboard = async (req, res) => {
  try {
    // Example: count total orders, products, and users
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      data: {
        totalOrders,
        totalProducts,
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
