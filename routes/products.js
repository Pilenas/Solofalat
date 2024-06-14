import express from 'express';
import Datastore from 'nedb';
import adminMiddleware from '../middlewares/admin.js';

const router = express.Router();
const productsDb = new Datastore({ filename: 'products.db', autoload: true });

// Lägg till ny produkt
router.post('/', adminMiddleware, (req, res) => {
    const { id, title, desc, price } = req.body;
    if (!id || !title || !desc || !price) {
        return res.status(400).send('All fields are required.');
    }
    const newProduct = { id, title, desc, price, createdAt: new Date() };
    productsDb.insert(newProduct, (err, product) => {
        if (err) {
            return res.status(500).send('Failed to add product.');
        }
        res.send(product);
    });
});

// Modifiera produkt
router.put('/:id', adminMiddleware, (req, res) => {
    const { id } = req.params;
    const { title, desc, price } = req.body;
    if (!title || !desc || !price) {
        return res.status(400).send('All fields are required.');
    }
    const updatedProduct = { title, desc, price, modifiedAt: new Date() };
    productsDb.update({ id }, { $set: updatedProduct }, {}, (err, numReplaced) => {
        if (err || numReplaced === 0) {
            return res.status(500).send('Failed to update product.');
        }
        res.send('Product updated.');
    });
});

// Ta bort produkt
router.delete('/:id', adminMiddleware, (req, res) => {
    const { id } = req.params;
    productsDb.remove({ id }, {}, (err, numRemoved) => {
        if (err || numRemoved === 0) {
            return res.status(500).send('Failed to delete product.');
        }
        res.send('Product deleted.');
    });
});

export default router;
