import { createProduct, getAllProducts } from '../database/models/Product.js';

export const addProduct = async (req, res) => {
  try {
    const result = await createProduct(req.body);
    res.status(201).json({ message: 'Product added', productId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
