import { useState } from 'react';
import api from '../services/api.js';

function ResumeUploader({ jobs, onResume, onAnalysis, onAts, onSkillGap, onResources }) {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [loading, setLoading] = useState(false);
  const [resumeId, setResumeId] = useState(null);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const uploadResponse = await api.post('/resume/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const resume = uploadResponse.data.data;
      setResumeId(resume._id);
      onResume(resume);
      const analysisResponse = await api.post('/ai/resume-analysis', { resumeId: resume._id });
      onAnalysis(analysisResponse.data.data);
      if (jobDesc) {
        const atsResponse = await api.post('/ai/ats-score', { resumeId: resume._id, jobDescription: jobDesc });
        onAts(atsResponse.data.data);
      }
      onSkillGap(null);
      onResources(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!resumeId || !selectedJob) return;
    setLoading(true);
    try {
      const skillGapResponse = await api.post('/ai/skill-gap', { resumeId, jobId: selectedJob });
      onSkillGap(skillGapResponse.data.data);
      const resourcesResponse = await api.post('/ai/learning-resources', { missingSkills: skillGapResponse.data.data.missingSkills });
      onResources(resourcesResponse.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Upload your resume</h2>
          <p className="mt-2 text-slate-600">Extract resume insights, generate ATS scores, and explore skill gaps.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button disabled={loading} onClick={handleUpload} className="rounded-2xl bg-brand-800 px-5 py-3 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">Analyze Resume</button>
          <button disabled={loading || !resumeId} onClick={handleEvaluate} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">Evaluate Skills</button>
        </div>
      </div>
      <form className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
          <span className="font-medium">Choose resume</span>
          <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
        <label className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
          <span className="font-medium">Job description text</span>
          <textarea rows="4" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="resize-none rounded-2xl border border-slate-200 bg-white p-3" placeholder="Paste a job description for ATS scoring" />
        </label>
        <label className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
          <span className="font-medium">Choose job for gap analysis</span>
          <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <option value="">Select a job</option>
            {jobs.map((job) => (
              <option key={job._id} value={job._id}>{job.title}</option>
            ))}
          </select>
        </label>
      </form>
      {loading && <p className="mt-4 text-sm text-slate-500">Processing resume... please wait.</p>}
    </section>
  );
}

export default ResumeUploader;
