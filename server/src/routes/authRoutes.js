import { Router } from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);

export default router;
