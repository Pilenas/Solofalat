import { Router } from "express";
import { addItemToCart, getCartItems, removeItemFromCart } from '../services/cart.js';

const router = Router();

// POST new coffee
router.post('/', async (req, res) => {
    try {
        await addItemToCart(req.body);
        res.json({ message: "Coffee added to cart!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error : "Failed to add coffee to cart" });
    }
});

// GET all coffees from cart
router.get('/', async (req, res) => {
    try {
        const items = await getCartItems();
        res.json(items);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error : "Failed to fetch items from cart" });
    }
});

// DELETE specific coffee from cart
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await removeItemFromCart(id);
        res.json({ message : "Coffee removed from cart!" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error : "Failer to remove coffee from cart" });
    }
});

export default router;