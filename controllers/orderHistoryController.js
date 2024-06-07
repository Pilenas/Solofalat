import { createOrUpdateOrderHistory, getAllOrderHistories, getOrderHistoryById } from '../services/order.js';

// Handler for creating or updating an order history
async function saveOrderHistory(req, res) {
    const orderHistoryData = req.body;
    try {
        await createOrUpdateOrderHistory(orderHistoryData);
        res.json({ message: 'Order history saved!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save order history' });
    }
}

// Handler for getting all order histories
async function getAllOrderHistoriesHandler(req, res) {
    try {
        const orderHistories = await getAllOrderHistories();
        res.json(orderHistories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch order histories' });
    }
}

// Handler for getting an order history by user ID
async function getOrderHistory(req, res) {
    const userId = req.query.userId;
    try {
        const orderHistory = await getOrderHistoryById(userId);
        res.json(orderHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch order history' });
    }
}

export {
    saveOrderHistory,
    getAllOrderHistoriesHandler,
    getOrderHistory
};