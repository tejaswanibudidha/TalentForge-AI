import { useState } from 'react';
import api from '../services/api.js';

function JobMatchCard({ jobs, resume }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const evaluateJobs = async () => {
    if (!resume || !jobs.length) return;
    setLoading(true);
    try {
      const result = await Promise.all(jobs.slice(0, 4).map(async (job) => {
        const response = await api.post('/ai/match', { resumeId: resume._id, jobId: job._id });
        return { ...job, match: response.data.data.matchScore, requiredSkills: job.requiredSkills };
      }));
      setMatches(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Smart Job Matches</h3>
        <button disabled={!resume || loading} onClick={evaluateJobs} className="rounded-2xl bg-brand-800 px-4 py-2 text-sm text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">Find Matches</button>
      </div>
      <div className="mt-6 space-y-4">
        {(matches.length ? matches : jobs.slice(0, 3)).map((job) => (
          <div key={job._id} className="rounded-3xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-slate-900">{job.title}</h4>
                <p className="text-sm text-slate-600">{job.company}</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">{job.match ? `${job.match}% match` : 'Preview'}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">Skills: {job.requiredSkills?.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobMatchCard;
