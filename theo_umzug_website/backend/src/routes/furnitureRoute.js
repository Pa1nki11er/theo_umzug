import { Router } from 'express';
import furnitureController from '../controllers/furnitureController.js';

const router = Router();

// Если нужен GET запрос:
router.get('/', furnitureController);

// Если нужен POST запрос:
router.post('/', furnitureController);

export default router;
