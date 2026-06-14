import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import AnimatedCard from '../../components/ui/AnimatedCard';
import AnimatedButton from '../../components/ui/AnimatedButton';

const defaultForm = {
  title: '',
  description: '',
  skills: '',
  salary: '',
  experience: '',
  openings: 1,
  location: ''
};

export default function RecruiterJobPostings() {
  const { user } = useAuth();
  const { jobs, companies, publishJob, refresh } = useData();
  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState(null);
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    setDrafts(jobs.filter((job) => job.recruiterId === user?.id));
  }, [jobs, user]);

  const recruiterCompany = companies.find((item) => item.recruiterId === user?.id);

  const saveJob = (event) => {
    event.preventDefault();
    if (!form.title || !form.description) return;
    publishJob({
      ...form,
      recruiterId: user.id,
      companyId: recruiterCompany?.id || null,
      company: recruiterCompany?.name || user.companyName || 'My Company',
    });
    setForm(defaultForm);
    refresh();
  };

  const startEdit = (job) => {
    setEditing(job.id);
    setForm({
      title: job.title,
      description: job.description,
      skills: job.skills,
      salary: job.salary,
      experience: job.experience,
      openings: job.openings,
      location: job.location
    });
  };

  const deleteJob = (jobId) => {
    const updated = jobs.filter((job) => job.id !== jobId);
    localStorage.setItem('talentforge_jobs', JSON.stringify(updated));
    refresh();
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Job Postings</h1>
            <p className="mt-2 text-slate-400">Create and manage the roles open at your company.</p>
          </div>
          <span className="rounded-full bg-indigo-950/80 px-4 py-2 text-sm text-slate-300">{drafts.length} posts</span>
        </div>
      </div>

      <AnimatedCard className="p-6">
        <h2 className="text-xl font-semibold text-slate-900">Create a new role</h2>
        <form onSubmit={saveJob} className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Job Title" className="rounded-3xl border border-slate-200 px-4 py-3" />
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" className="rounded-3xl border border-slate-200 px-4 py-3" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="Skills (comma separated)" className="rounded-3xl border border-slate-200 px-4 py-3" />
            <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="Salary" className="rounded-3xl border border-slate-200 px-4 py-3" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="Experience" className="rounded-3xl border border-slate-200 px-4 py-3" />
            <input type="number" value={form.openings} onChange={(e) => setForm({ ...form, openings: Number(e.target.value) })} placeholder="Openings" className="rounded-3xl border border-slate-200 px-4 py-3" />
          </div>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={4} className="rounded-3xl border border-slate-200 px-4 py-3" />
          <div className="flex justify-end">
            <AnimatedButton type="submit" className="rounded-3xl">Publish Job</AnimatedButton>
          </div>
        </form>
      </AnimatedCard>

      <div className="grid gap-4">
        {drafts.map((job) => (
          <AnimatedCard key={job.id} className="p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                <p className="text-sm text-slate-500">{job.location} • {job.experience} • {job.salary}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <AnimatedButton variant="ghost" onClick={() => startEdit(job)} className="rounded-full">Edit</AnimatedButton>
                <AnimatedButton variant="danger" onClick={() => deleteJob(job.id)} className="rounded-full">Delete</AnimatedButton>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
