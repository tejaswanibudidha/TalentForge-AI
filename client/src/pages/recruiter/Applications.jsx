import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import AnimatedCard from '../../components/ui/AnimatedCard';
import AnimatedButton from '../../components/ui/AnimatedButton';

export default function RecruiterApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user?.token) return;
    const fetchApplications = async () => {
      try {
        const res = await api.get(`/applications?recruiterId=${user.id}`);
        setApplications(res.data.data.applications || []);
      } catch (err) {
        console.error('Failed to fetch applications for recruiter:', err?.response?.data || err.message || err);
      }
    };
    fetchApplications();
  }, [user]);

  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}`, { status });
      setApplications((cur) => cur.map((a) => (a._id === applicationId ? { ...a, status } : a)));
    } catch (err) {
      console.error('Failed to update application status:', err);
    }
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
            <AnimatedCard key={app._id} className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{app.candidateId?.name || app.candidateId?.email || 'Candidate'}</h2>
                  <p className="text-sm text-slate-500">Applied to {app.jobId?.title || ''}</p>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">{app.status || 'Applied'}</span>
              </div>
              <div className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
                <div>Skills: {app.data?.skills || 'N/A'}</div>
                <div>Education: {app.data?.education || 'N/A'}</div>
                <div>Resume: {app.resumeUrl ? <a href={app.resumeUrl} target="_blank" rel="noreferrer">View</a> : 'Not provided'}</div>
                <div>Applied At: {new Date(app.appliedAt || app.createdAt).toLocaleString()}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <AnimatedButton type="button" onClick={() => updateStatus(app._id, 'Shortlisted')} className="rounded-full">Shortlist</AnimatedButton>
                <AnimatedButton type="button" variant="ghost" onClick={() => updateStatus(app._id, 'Rejected')} className="rounded-full">Reject</AnimatedButton>
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
