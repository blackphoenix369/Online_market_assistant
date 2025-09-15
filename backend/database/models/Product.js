// database/models/Product.js
import pool from '../db.js';

export const createProduct = async (product) => {
  const { name, description, price, stock } = product;
  const [result] = await pool.query(
    'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
    [name, description, price, stock]
  );
  return result;
};

export const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};
