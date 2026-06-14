import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => res.json({ message: 'List jobs endpoint placeholder' }));
router.post('/', (req, res) => res.json({ message: 'Create job endpoint placeholder' }));
router.put('/:id', (req, res) => res.json({ message: 'Update job endpoint placeholder' }));
router.delete('/:id', (req, res) => res.json({ message: 'Delete job endpoint placeholder' }));

export default router;
