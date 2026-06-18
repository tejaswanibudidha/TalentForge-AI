import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getNotifications, markNotificationsRead } from '../controllers/notificationController.js';

const router = Router();

router.get('/', authenticate, getNotifications);
router.put('/read', authenticate, markNotificationsRead);

export default router;
