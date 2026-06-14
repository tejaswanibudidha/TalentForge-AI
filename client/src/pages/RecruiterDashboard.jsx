import JobForm from '../components/JobForm';
import { getJobs } from '../services/jobService';
import { useState, useEffect } from 'react';
import AnimatedCard from '../components/ui/AnimatedCard';

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => setJobs(getJobs()), []);

  return (
    <div className="mx-auto max-w-6xl py-8 space-y-6">
      <h2 className="text-2xl font-semibold">Recruiter Dashboard</h2>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <JobForm onPublished={() => setJobs(getJobs())} />
        </div>
        <div className="space-y-3">
          <AnimatedCard className="p-4">Total Jobs: {jobs.length}</AnimatedCard>
          <AnimatedCard className="p-4">Total Applicants: {/* mock */}0</AnimatedCard>
        </div>
      </div>
    </div>
  );
}
