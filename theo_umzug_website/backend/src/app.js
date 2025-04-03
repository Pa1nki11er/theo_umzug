import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import calcRoute from './routes/calcRoute.js';
import furnitureList from './routes/furnitureRoute.js';
import orderPDF from './routes/orderPDF.js';
import emailRoute from "./routes/emailRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000'
  }));

// Middleware
app.use(express.json());

// Routes
app.use('/api/calculate', calcRoute);
app.use('/api/furniture', furnitureList);
app.use('/api/orderPDF', orderPDF);
app.use('/api/send', emailRoute);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
