import express from 'express';
import cors from 'cors';
import cartRoutes from './routes/cart.js';

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/cart', cartRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Middleware för felhantering