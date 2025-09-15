import express from 'express';
import { addProduct, listProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/', addProduct);
router.get('/', listProducts);

export default router;
