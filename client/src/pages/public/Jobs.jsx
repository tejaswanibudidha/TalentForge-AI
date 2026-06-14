import { useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import JobCard from '../../components/JobCard';
import AnimatedButton from '../../components/ui/AnimatedButton';

const experienceLevels = ['0-1 year', '1-3 years', '3-5 years', '5+ years'];

export default function Jobs() {
  const { jobs } = useData();
  const [search, setSearch] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [experience, setExperience] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = search ? [job.title, job.company, job.description].join(' ').toLowerCase().includes(search.toLowerCase()) : true;
      const matchesSkills = skills ? (job.skills || '').toLowerCase().includes(skills.toLowerCase()) : true;
      const matchesLocation = location ? job.location?.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesSalary = salaryRange ? (job.salary || '').toLowerCase().includes(salaryRange.toLowerCase()) : true;
      const matchesExperience = experience ? job.experience.toLowerCase().includes(experience.toLowerCase()) : true;
      return matchesSearch && matchesSkills && matchesLocation && matchesSalary && matchesExperience;
    });
  }, [jobs, search, skills, location, salaryRange, experience]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 py-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">Career marketplace</p>
        <h1 className="text-4xl font-extrabold text-slate-900">Browse jobs from recruiters across TalentForge.</h1>
        <p className="max-w-3xl text-slate-600">Filter openings by title, skills, location, salary, and experience to find roles that fit your next career move.</p>
      </div>

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:grid-cols-2 xl:grid-cols-5">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search job title" className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
        <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Search skills" className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
        <input value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="Salary range" className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700" />
        <select value={experience} onChange={(e) => setExperience(e.target.value)} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700">
          <option value="">Experience level</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level.toLowerCase()}>{level}</option>
          ))}
        </select>
      </div>

      {filteredJobs.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600">No jobs posted yet.</div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-900">Need help finding the right role?</h2>
        <p className="mt-3 text-slate-600">Use the filters above to narrow down openings based on skills, location, and salary expectations.</p>
        <AnimatedButton onClick={() => { setSearch(''); setSkills(''); setLocation(''); setSalaryRange(''); setExperience(''); }} className="mt-6 rounded-3xl">Clear filters</AnimatedButton>
      </div>
    </div>
  );
}
