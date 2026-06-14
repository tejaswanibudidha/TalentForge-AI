import { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import CompanyCard from '../../components/CompanyCard';

export default function Companies() {
  const { companies, jobs } = useData();
  const allCompanies = useMemo(
    () => companies.map((company) => ({
      ...company,
      openJobs: jobs.filter((job) => job.companyId === company.id || job.company === company.companyName).length
    })),
    [companies, jobs]
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 py-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Recruiter network</p>
        <h1 className="text-4xl font-extrabold text-slate-900">Discover trusted companies and hiring teams.</h1>
        <p className="max-w-3xl text-slate-600">Browse company profiles, see open roles, and explore recruiter-backed teams across industries.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {allCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
