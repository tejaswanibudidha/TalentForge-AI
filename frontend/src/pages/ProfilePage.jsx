import { useEffect, useState } from 'react';
import api from '../services/api.js';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', skills: '' });

  useEffect(() => {
    async function loadProfile() {
      const response = await api.get('/profile');
      setProfile(response.data.data);
      setForm({ name: response.data.data.name, skills: (response.data.data.skills || []).join(', ') });
    }
    loadProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updates = { name: form.name, skills: form.skills.split(',').map((skill) => skill.trim()).filter(Boolean) };
    const response = await api.put('/profile', updates);
    setProfile(response.data.data);
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
        {profile ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-600">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600">Skills</label>
              <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="React, Node, Python" />
            </div>
            <button className="rounded-2xl bg-brand-800 px-5 py-3 text-white hover:bg-brand-700">Save profile</button>
          </form>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
