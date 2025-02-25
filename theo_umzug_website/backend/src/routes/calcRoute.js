import { Router } from 'express';
import { calculateCost } from '../controllers/calcController.js';

const router = Router();

router.post('/', calculateCost);

export default router;
