import { Router } from 'express';
const router = Router();

router.post('/upload', (req, res) => res.json({ message: 'Resume upload placeholder' }));
router.post('/analyze', (req, res) => res.json({ message: 'Resume analysis placeholder' }));

export default router;
