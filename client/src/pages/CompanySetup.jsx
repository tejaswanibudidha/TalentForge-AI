import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function CompanySetup() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState(user?.profile || {});

  const save = (e) => {
    e.preventDefault();
    updateProfile(form);
    alert('Company profile saved (local)');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Company Onboarding</h2>
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input value={form.companyName || user?.companyName || ''} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="w-full rounded-12 border px-3 py-2" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input value={form.website || ''} onChange={(e) => setForm({ ...form, website: e.target.value })} className="w-full rounded-12 border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Headquarters</label>
            <input value={form.hq || ''} onChange={(e) => setForm({ ...form, hq: e.target.value })} className="w-full rounded-12 border px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hiring Requirements</label>
          <input value={form.hiring || ''} onChange={(e) => setForm({ ...form, hiring: e.target.value })} placeholder="Skills, experience, salary range" className="w-full rounded-12 border px-3 py-2" />
        </div>
        <div className="flex justify-end">
          <AnimatedButton type="submit" className="rounded-24">Save Company Profile</AnimatedButton>
        </div>
      </form>
    </div>
  );
}
