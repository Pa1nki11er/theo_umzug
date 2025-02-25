import express from 'express'; 
import dotenv from 'dotenv';
import calcRoute from './routes/calcRoute.js';
import furnitureList from './routes/furnitureRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Роуты
app.use('/api/calculate', calcRoute);
app.use('/api/furniture', furnitureList); // Исправлено

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
