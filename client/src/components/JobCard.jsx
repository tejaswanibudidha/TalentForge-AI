import { Link, useNavigate } from 'react-router-dom';
import AnimatedCard from './ui/AnimatedCard';
import AnimatedButton from './ui/AnimatedButton';

export default function JobCard({ job }) {
  const navigate = useNavigate();
  return (
    <AnimatedCard className="transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-100" />
          <div>
            <div className="font-semibold text-slate-900">{job.title}</div>
            <div className="text-sm text-slate-600">{job.company}</div>
          </div>
        </div>
        <div className="text-sm text-slate-600">{job.location}</div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-slate-600">{job.experience} • {job.salary}</div>
        <div className="flex gap-2">
          <Link to={`/jobs/${job.id}`} className="text-sm text-slate-700 hover:underline">View</Link>
          <AnimatedButton className="rounded-full px-4 py-2 text-sm" type="button" onClick={() => navigate(`/apply/${job.id}`)}>Apply</AnimatedButton>
        </div>
      </div>
    </AnimatedCard>
  );
}
