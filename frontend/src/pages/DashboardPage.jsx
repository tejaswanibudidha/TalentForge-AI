import { useEffect, useState } from 'react';
import api from '../services/api.js';
import ResumeUploader from '../components/ResumeUploader.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import JobMatchCard from '../components/JobMatchCard.jsx';
import AtsChart from '../components/AtsChart.jsx';
import SkillGapCard from '../components/SkillGapCard.jsx';
import InterviewCard from '../components/InterviewCard.jsx';
import ResourcesCard from '../components/ResourcesCard.jsx';

function DashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [ats, setAts] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [resources, setResources] = useState(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await api.get('/ai/jobs');
        setJobs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadJobs();
  }, []);

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Job Seeker AI Dashboard</h1>
          <p className="mt-2 text-slate-600">Analyze resumes, match to jobs, and unlock AI insights.</p>
        </div>
      </div>

      <ResumeUploader
        jobs={jobs}
        onResume={setResume}
        onAnalysis={setAnalysis}
        onAts={setAts}
        onSkillGap={setSkillGap}
        onResources={setResources}
      />

      {analysis && (
        <div className="grid gap-6 xl:grid-cols-3">
          <SummaryCard title="Resume Summary" data={analysis} />
          <AtsChart ats={ats} />
          <SkillGapCard data={skillGap} />
        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <JobMatchCard jobs={jobs} resume={resume} />
        <InterviewCard resume={resume} jobs={jobs} />
      </div>

      <div className="mt-8">
        <ResourcesCard resources={resources} />
      </div>
    </main>
  );
}

export default DashboardPage;
