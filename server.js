import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Middleware för felhantering