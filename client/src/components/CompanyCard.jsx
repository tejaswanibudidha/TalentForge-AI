import { Link } from 'react-router-dom';
import AnimatedCard from './ui/AnimatedCard';

export default function CompanyCard({ company }) {
  const name = company.name || company.companyName || 'Company';
  const logo = company.logo || name.charAt(0);
  const openJobs = company.openJobs?.length || 0;

  return (
    <AnimatedCard className="transition">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-3xl bg-slate-100 text-2xl flex items-center justify-center">{logo}</div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
            <p className="text-sm text-slate-600">{company.industry || 'Technology'}</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{company.hiringRoles || 'Hiring'}</span>
      </div>
      <p className="mt-4 text-sm text-slate-600">{company.description || 'A leading team focused on delivering hiring excellence with AI-powered recruiting.'}</p>
      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-[1fr_auto] items-center">
        <span>{openJobs ? `${openJobs} open role${openJobs > 1 ? 's' : ''}` : 'No open roles yet'}</span>
        <Link to={`/companies/${company.id}`} className="font-semibold text-indigo-700 hover:text-indigo-600">View details</Link>
      </div>
    </AnimatedCard>
  );
}
