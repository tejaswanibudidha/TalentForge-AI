import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { jobs, applyJob } = useData();
  const job = jobs.find((item) => item.id === id);
  const [form, setForm] = useState({ skills: '', education: '', resume: '' });
  const [applied, setApplied] = useState(false);

  const handleApply = (event) => {
    event.preventDefault();
    if (!user || user.role !== 'jobseeker') {
      alert('Please sign in as a job seeker to apply for this role.');
      return;
    }

    applyJob(id, {
      name: user.fullName || user.email,
      resume: form.resume,
      skills: form.skills,
      education: form.education,
      atsScore: Math.min(100, Math.max(55, (form.skills.split(',').filter(Boolean).length * 12) + 50)),
      status: 'Applied'
    });
    setApplied(true);
    alert('Application submitted successfully.');
  };

  if (!job) return <div className="p-6">Job not found</div>;

  return (
    <div className="mx-auto max-w-4xl py-8">
      <h2 className="text-2xl font-semibold">{job.title}</h2>
      <div className="mt-4 text-gray-600">{job.description}</div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-900">Role details</h3>
            <p className="text-slate-600">{job.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-600">
            <div>Location: {job.location || 'Remote'}</div>
            <div>Salary: {job.salary || 'TBD'}</div>
            <div>Experience: {job.experience || 'Any'}</div>
            <div>Openings: {job.openings || 1}</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h3 className="text-xl font-semibold text-slate-900">Apply for this role</h3>
          {applied ? (
            <p className="mt-4 text-slate-600">Your application has been submitted. Check your dashboard for updates.</p>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <textarea value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="Key skills (comma separated)" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700" rows={2} />
              <textarea value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} placeholder="Education summary" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700" rows={2} />
              <textarea value={form.resume} onChange={(e) => setForm({ ...form, resume: e.target.value })} placeholder="Paste resume summary" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700" rows={3} />
              <AnimatedButton type="submit" className="w-full rounded-3xl">{user?.role === 'jobseeker' ? 'Submit Application' : 'Sign in as Job Seeker'}</AnimatedButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
