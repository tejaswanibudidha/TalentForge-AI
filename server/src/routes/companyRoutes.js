import { Router } from 'express';
import { authenticate, recruiterOnly } from '../middlewares/authMiddleware.js';
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from '../controllers/companyController.js';

const router = Router();

router.post('/', authenticate, recruiterOnly, createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.put('/:id', authenticate, recruiterOnly, updateCompany);
router.delete('/:id', authenticate, recruiterOnly, deleteCompany);

export default router;
