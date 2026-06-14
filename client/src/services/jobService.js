import { defaultJobs } from '../data/companyJobs';

const JOBS_KEY = 'talentforge_jobs';

function load() {
  try { return JSON.parse(localStorage.getItem(JOBS_KEY)) || []; } catch { return []; }
}

function save(jobs) { localStorage.setItem(JOBS_KEY, JSON.stringify(jobs)); }

export function publishJob(job) {
  const jobs = load();
  const newJob = {
    id: Date.now().toString(),
    ...job,
    postedAt: new Date().toISOString(),
    applicants: [],
    companyId: job.companyId || null,
    recruiterId: job.recruiterId || null,
    role: job.title || ''
  };
  jobs.unshift(newJob);
  save(jobs);
  return newJob;
}

export function getJobs() {
  const stored = load();
  const merged = [...defaultJobs, ...stored];
  const unique = merged.reduce((acc, job) => {
    if (!acc.some((item) => item.id === job.id)) acc.push(job);
    return acc;
  }, []);
  return unique;
}

export function getJobById(id) {
  return getJobs().find((j) => j.id === id);
}

export function applyJob(jobId, application) {
  const persisted = load();
  const merged = getJobs();
  const job = merged.find((j) => j.id === jobId);
  if (!job) throw new Error('Job not found');

  const updatedJob = {
    ...job,
    applicants: [...(job.applicants || []), application],
  };

  const existingIndex = persisted.findIndex((j) => j.id === jobId);
  if (existingIndex >= 0) {
    persisted[existingIndex] = updatedJob;
  } else {
    persisted.unshift(updatedJob);
  }

  save(persisted);
}
