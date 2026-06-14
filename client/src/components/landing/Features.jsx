import FeatureCard from '../ui/FeatureCard';
import { Star, List, UserCheck, Calendar, BarChart2, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    { title: 'AI Resume Screening', desc: 'Fast resume parsing and scoring.', icon: <List /> },
    { title: 'Smart Candidate Ranking', desc: 'Rank candidates by fit score.', icon: <TrendingUp /> },
    { title: 'Job Matching Engine', desc: 'Match jobs to top talent.', icon: <UserCheck /> },
    { title: 'Interview Scheduling', desc: 'Automate interview bookings.', icon: <Calendar /> },
    { title: 'Analytics Dashboard', desc: 'Recruitment performance insights.', icon: <BarChart2 /> },
    { title: 'Recruiter Insights', desc: 'Actionable hiring recommendations.', icon: <Star /> }
  ];

  return (
    <section className="mx-auto max-w-7xl py-16">
      <h2 className="mb-6 text-2xl font-bold text-text-heading">Features</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.title} title={f.title} desc={f.desc} icon={f.icon} />
        ))}
      </div>
    </section>
  );
}
