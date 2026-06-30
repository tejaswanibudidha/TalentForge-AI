import { useParams, useNavigate } from 'react-router-dom';
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

  const handleApply = async (event) => {
    event.preventDefault();
    if (!user || user.role !== 'jobseeker') {
      alert('Please sign in as a job seeker to apply for this role.');
      return;
    }

    const payload = {
      jobId: id,
      resumeUrl: form.resume,
      coverLetter: '',
    };

    try {
      await applyJob(id, payload);
      setApplied(true);
      alert('Application submitted successfully.');
    } catch (err) {
      console.error('Apply failed:', err?.response?.data || err.message || err);
      alert(`Failed to submit application: ${err?.response?.data?.message || err.message || 'Server error'}`);
    }
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
          <p className="mt-4 text-slate-600">Please complete your application with a resume upload and cover letter for the best chance to be considered.</p>
          <div className="mt-6 grid gap-3">
            <AnimatedButton type="button" onClick={() => navigate(`/apply/${id}`)} className="w-full rounded-3xl">
              {user?.role === 'jobseeker' ? 'Continue to Apply' : 'Sign in as Job Seeker'}
            </AnimatedButton>
            <AnimatedButton type="button" variant="ghost" onClick={() => navigate(-1)} className="w-full rounded-3xl">
              Back to listings
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
