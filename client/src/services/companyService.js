import { defaultCompanies } from '../data/companies';

const COMPANIES_KEY = 'talentforge_companies';

const DEFAULT_COMPANIES = defaultCompanies.map((company) => ({
  ...company,
  companyName: company.companyName || company.name,
  name: company.name || company.companyName,
}));

function load() {
  try {
    return JSON.parse(localStorage.getItem(COMPANIES_KEY)) || [];
  } catch {
    return [];
  }
}

function save(companies) {
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
}

export function getCompanies() {
  const persisted = load();
  return [...DEFAULT_COMPANIES, ...persisted];
}

export function getCompanyById(id) {
  return getCompanies().find((company) => company.id === id);
}

export function getCompanyByRecruiter(recruiterId) {
  return load().find((company) => company.recruiterId === recruiterId);
}

export function saveCompany(company) {
  const companies = load();
  const now = new Date().toISOString();
  const existing = companies.find((item) => item.id === company.id || item.recruiterId === company.recruiterId);

  const record = {
    id: existing?.id || `${Date.now()}`,
    recruiterId: company.recruiterId,
    recruiterName: company.recruiterName,
    companyName: company.companyName || company.name || 'New Company',
    name: company.name || company.companyName || 'New Company',
    logo: company.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.companyName || company.name || 'TalentForge')}&background=7c3aed&color=fff&size=128`,
    banner: company.banner || '',
    hero: company.hero || {
      headline: `${company.companyName || company.name || 'Company'} is hiring`,
      subtext: company.description || 'Grow your career with this organization.',
    },
    description: company.description || '',
    mission: company.mission || '',
    vision: company.vision || '',
    recruiting: company.recruiting || [],
    salary: company.salary || [],
    benefits: company.benefits || [],
    leadership: company.leadership || [],
    locations: company.locations || [],
    website: company.website || '',
    hq: company.hq || '',
    hiringRoles: company.hiringRoles || '',
    videos: company.videos || [],
    reviews: company.reviews || [],
    gallery: company.gallery || [],
    preparation: company.preparation || [],
    openJobs: company.openJobs || [],
    updatedAt: now,
    createdAt: existing?.createdAt || now,
  };

  const updated = existing ? companies.map((item) => (item.id === record.id ? record : item)) : [record, ...companies];
  save(updated);
  return record;
}
