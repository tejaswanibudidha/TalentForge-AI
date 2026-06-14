import { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import AnimatedCard from '../../components/ui/AnimatedCard';
import AnimatedButton from '../../components/ui/AnimatedButton';

export default function RecruiterApplications() {
  const { user } = useAuth();
  const { jobs, applyJob } = useData();

  const applications = useMemo(() => {
    const ownJobs = jobs.filter((job) => job.recruiterId === user?.id || job.company === user?.companyName);
    return ownJobs.flatMap((job) => (job.applicants || []).map((app) => ({ ...app, jobTitle: job.title, jobId: job.id })));
  }, [jobs, user]);

  const updateStatus = (jobId, applicant, status) => {
    const stored = jobs.map((job) => {
      if (job.id !== jobId) return job;
      return {
        ...job,
        applicants: job.applicants.map((item) => (item.name === applicant.name && item.date === applicant.date ? { ...item, status } : item))
      };
    });
    localStorage.setItem('talentforge_jobs', JSON.stringify(stored));
    window.location.reload();
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-slate-900">Applications</h1>
        <p className="mt-2 text-slate-600">Review candidate submissions and manage your hiring pipeline.</p>
      </div>

      {applications.length ? (
        <div className="grid gap-4">
          {applications.map((app) => (
            <AnimatedCard key={`${app.jobId}-${app.name}-${app.date}`} className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{app.name}</h2>
                  <p className="text-sm text-slate-500">Applied to {app.jobTitle}</p>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">{app.status || 'Applied'}</span>
              </div>
              <div className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
                <div>Skills: {app.skills || 'N/A'}</div>
                <div>Education: {app.education || 'N/A'}</div>
                <div>ATS score: {app.atsScore || 'N/A'}</div>
                <div>Resume: {app.resume ? 'Provided' : 'Not provided'}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <AnimatedButton type="button" onClick={() => updateStatus(app.jobId, app, 'Shortlisted')} className="rounded-full">Shortlist</AnimatedButton>
                <AnimatedButton type="button" variant="ghost" onClick={() => updateStatus(app.jobId, app, 'Rejected')} className="rounded-full">Reject</AnimatedButton>
                <AnimatedButton type="button" variant="ghost" className="rounded-full">View Profile</AnimatedButton>
              </div>
            </AnimatedCard>
          ))}
        </div>
      ) : (
        <AnimatedCard className="p-8 text-slate-400">No applications have been submitted for your jobs yet.</AnimatedCard>
      )}
    </div>
  );
}
