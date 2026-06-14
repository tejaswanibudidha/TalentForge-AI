import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function ProfileSetup() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState(user?.profile || {});

  const save = (e) => {
    e.preventDefault();
    updateProfile(form);
    alert('Profile saved (local)');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Complete your profile</h2>
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input value={form.fullName || user?.fullName || ''} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full rounded-12 border px-3 py-2" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input value={form.mobile || ''} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full rounded-12 border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-12 border px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
          <input value={form.skills || ''} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="w-full rounded-12 border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">About Me</label>
          <textarea value={form.about || ''} onChange={(e) => setForm({ ...form, about: e.target.value })} className="w-full rounded-12 border px-3 py-2" />
        </div>
        <div className="flex justify-end">
          <AnimatedButton type="submit" className="rounded-24">Save Profile</AnimatedButton>
        </div>
      </form>
    </div>
  );
}
