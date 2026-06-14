import { defaultCompanies } from './companies';

export const defaultJobs = defaultCompanies.flatMap((company) =>
  (company.openJobs || []).map((job) => ({
    ...job,
    companyId: company.id,
    company: company.name,
    recruiterId: company.recruiterId,
    postedAt: job.postedAt || new Date().toISOString(),
  }))
);
