import express from "express";
import { getAllOrderHistoriesHandler, getOrderHistory, saveOrderHistory } from "../controllers/orderHistoryController.js";
import { createOrder, getOrderById } from '../services/order.js';
import { delivery } from '../config/orderdata.js';

const router = express.Router();

// POST route for saving order history
router.post("/", saveOrderHistory);

// GET route for fetching all order histories
router.get("/all", getAllOrderHistoriesHandler);

// GET route for fetching an order history by userId
router.get("/", getOrderHistory);

// POST new order
router.post('/create', async (req, res) => {
    try {
        const order = await createOrder(req.body);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to place order" });
    }
});

// GET order status by ID
router.get('/:id/status', async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const orderStatus = delivery[orderId];
        if (!orderStatus) {
            return res.status(404).json({ error: "Order status not found" });
        }

        res.json(orderStatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch order status" });
    }
});

export default router;
