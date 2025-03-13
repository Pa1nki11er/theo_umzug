import { Router } from 'express';
import orderPDFController from '../controllers/orderPDFController.js';

const router = Router();

// Если нужен GET запрос:
router.get('/', orderPDFController);

// Если нужен POST запрос:
router.post('/', orderPDFController);

export default router;
