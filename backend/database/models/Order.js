// database/models/Order.js
import pool from '../db.js';

export const createOrder = async (order) => {
  const { user_id, product_id, quantity } = order;
  const [result] = await pool.query(
    'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)',
    [user_id, product_id, quantity]
  );
  return result;
};

export const getOrdersByUser = async (user_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM orders WHERE user_id = ?',
    [user_id]
  );
  return rows;
};
