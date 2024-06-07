import express from 'express';
import cors from 'cors';
import cartRoutes from './routes/cart.js';
import menuRouter from './routes/menu.js';
import aboutRouter from './routes/about.js';
import authRouter from './routes/auth.js';
import deliveryRouter from './routes/delivery.js';
import ordersRouter from './routes/orders.js';  // Importera ordersRouter

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/cart', cartRoutes);
app.use('/menu', menuRouter);       // Alla kaffesorter på menyn http://localhost:8080/menu/titles
app.use('/about', aboutRouter);      //  //GET localhost:8080/about
app.use('/auth', authRouter);
app.use('/delivery', deliveryRouter);    // Estimated delivery   http://localhost:8080/delivery/15
app.use('/api/orders', ordersRouter);  //  OrdersHistoy  http://localhost:8080/api/orders/all

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

// Middleware för felhantering
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});