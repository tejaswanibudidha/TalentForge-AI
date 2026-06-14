import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import AnimatedCard from '../../components/ui/AnimatedCard';
import AnimatedButton from '../../components/ui/AnimatedButton';

export default function Apply() {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { applyJob } = useData();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    qualification: '',
    college: '',
    branch: '',
    gradYear: '',
    cgpa: '',
    status: '',
    experience: '',
    currentCompany: '',
    previousTitle: '',
    skills: '',
    certifications: '',
    languages: '',
    resumeName: '',
    coverName: '',
    portfolio: '',
    linkedin: '',
    github: '',
    prefLocation: '',
    expectedSalary: '',
    noticePeriod: '',
    joinDate: '',
    q_why: '',
    q_projects: '',
    willingRelocate: 'No',
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFile = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, [fieldName]: file.name, [`${fieldName}Data`]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('talentforge_drafts') || '[]');
    drafts.unshift({ jobId, ...form, savedAt: new Date().toISOString() });
    localStorage.setItem('talentforge_drafts', JSON.stringify(drafts));
    alert('Saved as draft');
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.declaration) return alert('Please confirm the declaration');
    const application = { ...form, status: 'Applied', date: new Date().toISOString() };
    const success = applyJob(jobId, application);
    if (success) {
      navigate('/dashboard');
    } else {
      alert('Failed to submit application');
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <AnimatedCard className="p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Apply for Job</h1>
        <p className="text-sm text-slate-500">Fill out the form below to submit your application.</p>

        <form className="mt-6 space-y-6" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="dob" value={form.dob} onChange={handleChange} placeholder="Date of birth" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input name="qualification" value={form.qualification} onChange={handleChange} placeholder="Highest qualification" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="college" value={form.college} onChange={handleChange} placeholder="College / University" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch / Specialization" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="gradYear" value={form.gradYear} onChange={handleChange} placeholder="Graduation year" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="cgpa" value={form.cgpa} onChange={handleChange} placeholder="CGPA / Percentage" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3">
              <option value="">Current status</option>
              <option>Student</option>
              <option>Fresher</option>
              <option>Experienced</option>
            </select>
            <input name="experience" value={form.experience} onChange={handleChange} placeholder="Years of experience" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="currentCompany" value={form.currentCompany} onChange={handleChange} placeholder="Current company" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="previousTitle" value={form.previousTitle} onChange={handleChange} placeholder="Previous job title" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </div>

          <div>
            <textarea name="skills" value={form.skills} onChange={handleChange} placeholder="Technical skills (comma separated)" className="w-full rounded-xl border border-slate-200 px-4 py-3 h-24" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="Portfolio URL" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="certifications" value={form.certifications} onChange={handleChange} placeholder="Certifications" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <div className="text-sm text-slate-600">Upload resume</div>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFile(e, 'resumeName')} className="mt-2" />
            </label>
            <label className="block">
              <div className="text-sm text-slate-600">Upload cover letter</div>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFile(e, 'coverName')} className="mt-2" />
            </label>
          </div>

          <div>
            <textarea name="q_why" value={form.q_why} onChange={handleChange} placeholder="Why are you interested in this role?" className="w-full rounded-xl border border-slate-200 px-4 py-3 h-28" />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="declaration" checked={form.declaration} onChange={handleChange} />
            <div className="text-sm text-slate-600">I confirm that all information provided is accurate.</div>
          </div>

          <div className="flex flex-wrap gap-3">
            <AnimatedButton type="submit">Submit Application</AnimatedButton>
            <AnimatedButton type="button" variant="ghost" onClick={saveDraft}>Save As Draft</AnimatedButton>
            <AnimatedButton type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</AnimatedButton>
          </div>
        </form>
      </AnimatedCard>
    </div>
  );
}
