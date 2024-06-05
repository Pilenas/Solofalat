import { Router } from "express";
import { addItemToCart, getCartItems } from '../services/cart.js';

const router = Router();

// POST new coffee
router.post('/', async (req, res) => {
    await addItemToCart(req.body);
    res.json({ message : "Coffee added to cart!"});
});

// GET all coffees from cart
router.get('/', async (req, res) => {
    try {
        const items = await getCartItems();
        res.json(items);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error : "Failed to fetch items from cart"});
    }
});

export default router;