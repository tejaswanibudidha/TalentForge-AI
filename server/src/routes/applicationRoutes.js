import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => res.json({ message: 'Get applications placeholder' }));
router.post('/', (req, res) => res.json({ message: 'Apply to job placeholder' }));

export default router;
