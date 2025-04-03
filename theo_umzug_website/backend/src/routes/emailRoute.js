import {Router} from 'express';
import emailController from "../controllers/emailController.js";
const router = Router();

// Если нужен POST запрос:
router.post('/', emailController);

export default router;