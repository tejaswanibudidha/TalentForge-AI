import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AnimatedCard from '../../components/ui/AnimatedCard';
import AnimatedButton from '../../components/ui/AnimatedButton';

export default function CompanyDetails() {
  const { id } = useParams();
  const { companies, jobs } = useData();
  const company = companies.find((item) => item.id === id);

  if (!company) {
    return (
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700">
        <h1 className="text-3xl font-semibold">Company not found</h1>
        <p className="mt-4 text-slate-600">We could not locate that company profile.</p>
        <Link to="/companies" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white hover:opacity-95">
          Back to companies
        </Link>
      </div>
    );
  }

  const name = company.name || company.companyName || 'Company';
  const logo = company.logo || name.charAt(0);
  const heroHeadline = company.hero?.headline || `${name} is hiring top talent`;
  const heroSubtext = company.hero?.subtext || company.description || 'Explore the team, culture, and open roles at this recruiter-backed company.';
  const benefits = company.benefits || [];
  const locations = company.locations || [];
  const recruiting = company.recruiting || [];
  const openJobs = jobs.filter((job) => job.companyId === company.id || job.company === name);

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-lg">
        <div className="relative h-64 bg-slate-900/5">
          {company.banner ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${company.banner})` }} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-slate-900 opacity-30" />
          )}
          <div className="relative z-10 flex h-full items-end p-8">
            <div className="flex items-center gap-4 rounded-3xl bg-white/90 p-4 shadow-xl backdrop-blur-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600 text-3xl text-white">{logo}</div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-700">Company</p>
                <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
                <p className="text-sm text-slate-600">{company.industry || 'Technology'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold text-slate-900">{heroHeadline}</h2>
                <p className="max-w-3xl text-slate-600">{heroSubtext}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AnimatedCard>
                  <h3 className="text-lg font-semibold text-slate-900">Mission</h3>
                  <p className="mt-3 text-sm text-slate-600">{company.mission || 'Building meaningful careers through purpose-led technology and people-first hiring.'}</p>
                </AnimatedCard>
                <AnimatedCard>
                  <h3 className="text-lg font-semibold text-slate-900">Vision</h3>
                  <p className="mt-3 text-sm text-slate-600">{company.vision || 'Transforming how teams discover, hire and retain talent in the modern workforce.'}</p>
                </AnimatedCard>
              </div>

              {benefits.length > 0 && (
                <AnimatedCard>
                  <h3 className="text-lg font-semibold text-slate-900">Benefits</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="rounded-2xl bg-slate-50 px-4 py-3">{benefit}</li>
                    ))}
                  </ul>
                </AnimatedCard>
              )}

              {locations.length > 0 && (
                <AnimatedCard>
                  <h3 className="text-lg font-semibold text-slate-900">Locations</h3>
                  <div className="mt-4 grid gap-2 text-sm text-slate-600">
                    {locations.map((location) => (
                      <span key={location} className="rounded-2xl bg-slate-50 px-4 py-3">{location}</span>
                    ))}
                  </div>
                </AnimatedCard>
              )}

              {recruiting.length > 0 && (
                <AnimatedCard>
                  <h3 className="text-lg font-semibold text-slate-900">Recruiting process</h3>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    {recruiting.map((step) => (
                      <div key={step.step} className="rounded-3xl bg-slate-50 px-4 py-3">
                        <div className="font-semibold text-slate-900">{step.step}</div>
                        <div>{step.detail}</div>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              )}
            </div>

            <div className="space-y-6">
              <AnimatedCard>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-indigo-500">Overview</p>
                      <h3 className="text-xl font-semibold text-slate-900">Company details</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{openJobs.length} roles</span>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div><span className="font-semibold text-slate-900">Headquarters:</span> {company.hq || 'Not provided'}</div>
                    <div><span className="font-semibold text-slate-900">Industry:</span> {company.industry || 'Recruiting'}</div>
                    <div><span className="font-semibold text-slate-900">Website:</span> {company.website ? <a href={company.website} target="_blank" rel="noreferrer" className="text-indigo-600">Visit site</a> : 'Not available'}</div>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard>
                <h3 className="text-lg font-semibold text-slate-900">About the company</h3>
                <p className="mt-3 text-sm text-slate-600">{company.description || 'This company is known for delivering modern hiring solutions backed by trusted recruiter expertise.'}</p>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold text-slate-900">Open roles</h2>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{openJobs.length} job(s)</span>
        </div>
        <div className="grid gap-4">
          {openJobs.length ? openJobs.map((job) => (
            <AnimatedCard key={job.id} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-600">{job.location} • {job.experience}</p>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">{job.salary}</span>
              </div>
              <p className="text-sm text-slate-600">{job.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                {(job.skills || '').split(',').map((skill) => skill.trim()).filter(Boolean).map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-3 py-1">{skill}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span>{new Date(job.postedAt).toLocaleDateString()}</span>
                <div className="ml-auto flex gap-2">
                  <Link to={`/jobs/${job.id}`} className="text-sm text-indigo-700 font-semibold">View</Link>
                  <AnimatedButton type="button" onClick={() => window.location.assign(`/apply/${job.id}`)} variant="solid" className="rounded-full px-4 py-2 text-sm">Apply</AnimatedButton>
                </div>
              </div>
            </AnimatedCard>
          )) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">No open jobs are currently listed for this company.</div>
          )}
        </div>
      </div>
    </div>
  );
}
