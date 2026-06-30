import express from 'express';
import {
  getAllCompanies,
  getCompanyById,
  getCompanyByCompanyId,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controllers/companyController.js';

const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.get('/companyId/:companyId', getCompanyByCompanyId);
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

export default router;
