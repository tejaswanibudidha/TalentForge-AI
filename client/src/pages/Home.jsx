import { useEffect, useState } from 'react';
import { getJobs } from '../services/jobService';
import JobCard from '../components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(()=>{ setJobs(getJobs()); }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8">
      <h2 className="text-2xl font-semibold">Job Listings</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {jobs.length ? jobs.map(j=> <JobCard key={j.id} job={j} />) : <div className="text-gray-500">No jobs yet.</div>}
      </div>
    </div>
  );
}
