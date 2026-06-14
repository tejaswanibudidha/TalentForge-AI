import { Router } from 'express';
const router = Router();

router.get('/stats', (req, res) => res.json({ message: 'Admin dashboard stats placeholder' }));

export default router;
