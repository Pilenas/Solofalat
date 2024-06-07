import express from 'express';
import cors from 'cors';
import cartRoutes from './routes/cart.js';
import menuRouter from './routes/menu.js';
import aboutRouter from './routes/about.js';
import authRouter from './routes/auth.js';
import orderRouter from './routes/orders.js';

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/cart', cartRoutes);
app.use('/menu', menuRouter);
app.use('/about', aboutRouter);
app.use('/auth', authRouter);
app.use('/order', orderRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

// Middleware för felhantering
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
