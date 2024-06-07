import express from "express";
import { getAllOrderHistoriesHandler, getOrderHistory, saveOrderHistory } from "../controllers/orderHistoryController.js";

const router = express.Router();

// POST route for saving order history
router.post("/", saveOrderHistory);

// GET route for fetching all order histories
router.get("/all", getAllOrderHistoriesHandler);

// GET route for fetching an order history by userId
router.get("/", getOrderHistory);

export default router;