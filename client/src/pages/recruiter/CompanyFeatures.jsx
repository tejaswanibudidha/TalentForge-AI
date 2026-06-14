import { useAuth } from '../../context/AuthContext';
import AnimatedCard from '../../components/ui/AnimatedCard';

const features = [
  { title: 'Hiring Analytics', description: 'Track job views, candidate flow, and hiring velocity in one dashboard.' },
  { title: 'Candidate Ranking', description: 'Score applicants and compare top matches with AI-driven ranking.' },
  { title: 'ATS Filtering', description: 'Filter applicants by experience, skills, and ATS scores to find the best fits.' },
  { title: 'Application Statistics', description: 'Monitor application volume, conversion rates, and time-to-hire.' }
];

export default function RecruiterFeatures() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-white">Company Features</h1>
        <p className="mt-2 text-slate-400">Grow your hiring program using AI-enabled recruiter workflows.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <AnimatedCard key={feature.title} className="p-6">
            <h2 className="text-xl font-semibold text-slate-900">{feature.title}</h2>
            <p className="mt-3 text-sm text-slate-500">{feature.description}</p>
          </AnimatedCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AnimatedCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-900">Your recruiter profile</h2>
          <p className="mt-3 text-slate-500">Current company: {user?.companyName || 'Not set'}</p>
          <p className="mt-1 text-slate-500">Role: {user?.role === 'recruiter' ? 'Recruiter' : 'Job seeker'}</p>
        </AnimatedCard>
        <AnimatedCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-900">ATS filtering</h2>
          <p className="mt-3 text-slate-500">Quickly filter applicants by resume match, skills, education, and score.</p>
        </AnimatedCard>
        <AnimatedCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-900">Analytics snapshot</h2>
          <p className="mt-3 text-slate-500">View hiring progress, interview readiness, and applicant pipeline health.</p>
        </AnimatedCard>
      </div>
    </div>
  );
}
