import express from 'express';
import cors from 'cors';
import menuRouter from './routes/menu.js';

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/menu', menuRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

// Middleware för felhantering