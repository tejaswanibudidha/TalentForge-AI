import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import JobCard from '../../components/JobCard';
import CompanyCard from '../../components/CompanyCard';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import AnimatedButton from '../../components/ui/AnimatedButton';

export default function Home() {
  const { user } = useAuth();
  const { jobs, companies, posts } = useData();
  const [highlightedSkill, setHighlightedSkill] = useState('AI');
  const navigate = useNavigate();

  const featuredJobs = useMemo(() => jobs.slice(0, 4), [jobs]);
  const featuredCompanies = useMemo(() => companies.slice(0, 6), [companies]);
  const recentPosts = useMemo(() => posts.slice(0, 4), [posts]);
  const totalApplicants = jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0);

  return (
    <div className="mx-auto max-w-7xl space-y-16 py-10">
      <section className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">TalentForge AI</p>
          <h1 className="text-5xl font-extrabold text-slate-900">Recruit smarter, hire faster, and connect talent with opportunity.</h1>
          <p className="max-w-3xl text-slate-600">TalentForge AI is a modern AI recruitment platform designed for recruiters and job seekers. Track jobs, browse companies, and discover community projects all from one polished experience.</p>
          <div className="flex flex-wrap gap-4">
            <AnimatedButton className="rounded-3xl" onClick={() => navigate('/jobs')}>Explore jobs</AnimatedButton>
            <AnimatedButton variant="ghost" className="rounded-3xl" onClick={() => navigate('/companies')}>See companies</AnimatedButton>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg">
          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Latest activity</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">{jobs.length} active jobs posted</h2>
              <p className="text-slate-600">Browse the newest roles added by recruiters on TalentForge AI.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <p className="text-sm text-slate-500">Companies</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{companies.length}</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <p className="text-sm text-slate-500">Applicants</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{totalApplicants}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Latest jobs</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Newest roles from recruiters</h2>
          </div>
          <p className="text-sm text-slate-500">Featured skills: {highlightedSkill}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredJobs.length ? featuredJobs.map((job) => <JobCard key={job.id} job={job} />) : <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-500">No jobs are available right now.</div>}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Featured companies</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Top recruiter companies</h2>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Updated daily</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredCompanies.length ? featuredCompanies.map((company) => <CompanyCard key={company.id} company={company} />) : <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-500">No company profiles yet.</div>}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Community feed</p>
              <h2 className="text-3xl font-extrabold text-slate-900">Recent job seeker updates</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Community-driven</span>
          </div>
          <div className="grid gap-4">
            {recentPosts.length ? recentPosts.map((post) => <PostCard key={post.id} post={post} />) : <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-500">No community posts yet. Be the first to share an update.</div>}
          </div>
        </div>

        <PostForm />
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Stats</p>
          <p className="mt-4 text-4xl font-extrabold text-indigo-700">{companies.length}</p>
          <p className="mt-2 text-slate-600">Total Companies</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Stats</p>
          <p className="mt-4 text-4xl font-extrabold text-indigo-700">{jobs.length}</p>
          <p className="mt-2 text-slate-600">Total Jobs</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Stats</p>
          <p className="mt-4 text-4xl font-extrabold text-indigo-700">{totalApplicants}</p>
          <p className="mt-2 text-slate-600">Total Applicants</p>
        </div>
      </section>
    </div>
  );
}
