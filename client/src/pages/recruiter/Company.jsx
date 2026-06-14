import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import AnimatedButton from '../../components/ui/AnimatedButton';

export default function RecruiterCompany() {
  const { user, updateProfile } = useAuth();
  const { companies, saveCompany } = useData();
  const company = companies.find((item) => item.recruiterId === user?.id) || {
    logo: '🏢',
    companyName: user?.companyName || 'My Company',
    name: user?.companyName || 'My Company',
    website: '',
    description: '',
    industry: '',
    hq: '',
    hiringRoles: '',
    benefits: [],
    locations: [],
    mission: '',
    vision: '',
    process: '',
    banner: '',
    hero: {},
  };

  const [form, setForm] = useState({
    logo: company.logo,
    banner: company.banner || '',
    companyName: company.companyName,
    name: company.name,
    industry: company.industry,
    description: company.description,
    website: company.website,
    hq: company.hq,
    hiringRoles: company.hiringRoles,
    benefits: company.benefits || [],
    locations: company.locations || [],
    mission: company.mission || '',
    vision: company.vision || '',
    process: company.process || ''
  });

  const handleSave = (event) => {
    event.preventDefault();
    saveCompany({
      recruiterId: user.id,
      recruiterName: user.fullName,
      ...form
    });
    updateProfile({ companyName: form.companyName });
    alert('Company profile saved.');
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-slate-900">My Company</h1>
        <p className="mt-2 text-slate-600">Manage your recruiter profile, brand, and hiring process.</p>
      </div>

      <form onSubmit={handleSave} className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Company logo URL
            <input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} placeholder="https://..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Company name
            <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Industry
            <input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Website
            <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Headquarters
            <input value={form.hq} onChange={(e) => setForm({ ...form, hq: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Banner image URL
            <input value={form.banner} onChange={(e) => setForm({ ...form, banner: e.target.value })} placeholder="https://..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-700">
          Hiring roles
          <input value={form.hiringRoles} onChange={(e) => setForm({ ...form, hiringRoles: e.target.value })} placeholder="e.g. AI, Cloud, Product" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Description
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Benefits (comma separated)
          <input value={form.benefits.join(', ')} onChange={(e) => setForm({ ...form, benefits: e.target.value.split(',').map((item) => item.trim()) })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Locations (comma separated)
          <input value={form.locations.join(', ')} onChange={(e) => setForm({ ...form, locations: e.target.value.split(',').map((item) => item.trim()) })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Mission
          <textarea value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} rows={3} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Vision
          <textarea value={form.vision} onChange={(e) => setForm({ ...form, vision: e.target.value })} rows={3} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Hiring process
          <textarea value={form.process} onChange={(e) => setForm({ ...form, process: e.target.value })} rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900" />
        </label>

        <div className="flex justify-end">
          <AnimatedButton type="submit" className="rounded-3xl">Save Company</AnimatedButton>
        </div>
      </form>
    </div>
  );
}
