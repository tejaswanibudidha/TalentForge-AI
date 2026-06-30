import { useState } from 'react';
import api from '../services/api.js';

function InterviewCard({ resume, jobs }) {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('technical');
  const [jobId, setJobId] = useState('');

  const generateQuestions = async () => {
    if (!resume || !jobId) return;
    setLoading(true);
    try {
      const response = await api.post('/ai/interview-questions', { resumeId: resume._id, jobId, categories: [category] });
      setQuestions(response.data.data.questions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Interview Question Generator</h3>
          <p className="text-slate-600">Create tailored technical, HR, or behavioral questions.</p>
        </div>
        <button disabled={loading || !resume || !jobId} onClick={generateQuestions} className="rounded-2xl bg-brand-800 px-4 py-2 text-sm text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">Generate</button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <option value="technical">Technical</option>
          <option value="hr">HR</option>
          <option value="behavioral">Behavioral</option>
        </select>
        <select value={jobId} onChange={(e) => setJobId(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <option value="">Select job</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>{job.title}</option>
          ))}
        </select>
      </div>
      {questions && (
        <div className="mt-6 space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="rounded-3xl bg-slate-50 p-4">
              <p className="text-slate-700">{question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewCard;
