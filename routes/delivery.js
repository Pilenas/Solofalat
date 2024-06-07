import { Router } from 'express';
import { delivery } from '../config/orderdata.js';

const router = Router();

router.get('/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const order = delivery[orderId];

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

export default router;
