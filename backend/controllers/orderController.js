import { createOrder, getOrdersByUser } from '../database/models/Order.js';

export const placeOrder = async (req, res) => {
  try {
    const result = await createOrder(req.body);
    res.status(201).json({ message: 'Order placed', orderId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    const orders = await getOrdersByUser(user_id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
