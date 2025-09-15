import express from 'express';
import { placeOrder, userOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', placeOrder);
router.get('/:user_id', userOrders);

export default router;
