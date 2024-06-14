import express from 'express';
import Datastore from 'nedb';
import adminMiddleware from '../middlewares/admin.js';

const router = express.Router();
const offersDb = new Datastore({ filename: 'offers.db', autoload: true });
const productsDb = new Datastore({ filename: 'products.db', autoload: true });

// Lägg till kampanjerbjudande
router.post('/', adminMiddleware, (req, res) => {
    const { products, price } = req.body;
    if (!products || !price || !Array.isArray(products) || products.length === 0) {
        return res.status(400).send('Invalid products or price.');
    }
    productsDb.find({ id: { $in: products } }, (err, docs) => {
        if (err || docs.length !== products.length) {
            return res.status(400).send('One or more products not found.');
        }
        const newOffer = { products, price, createdAt: new Date() };
        offersDb.insert(newOffer, (err, offer) => {
            if (err) {
                return res.status(500).send('Failed to add offer.');
            }
            res.send(offer);
        });
    });
});

export default router;
