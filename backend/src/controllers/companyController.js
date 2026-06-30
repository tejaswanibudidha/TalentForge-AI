import Company from '../models/Company.js';

export async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find().populate('recruiterId', 'name email');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCompanyById(req, res) {
  try {
    const { id } = req.params;
    const company = await Company.findById(id).populate('recruiterId', 'name email');
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCompanyByCompanyId(req, res) {
  try {
    const { companyId } = req.params;
    const company = await Company.findOne({ companyId }).populate('recruiterId', 'name email');
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createCompany(req, res) {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateCompany(req, res) {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndUpdate(id, req.body, { new: true });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteCompany(req, res) {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
