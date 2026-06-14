import { useState } from 'react';
import { publishJob } from '../services/jobService';

export default function JobForm({ onPublished }) {
  const [form, setForm] = useState({ title: '', company: '', description: '', skills: '', experience: '0-1', salary: '', location: '', openings: 1 });

  const submit = (e) => {
    e.preventDefault();
    publishJob(form);
    onPublished?.();
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-24 bg-white p-6 shadow">
      <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Job Title" className="w-full rounded-12 border px-3 py-2" />
      <input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="Company" className="w-full rounded-12 border px-3 py-2" />
      <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full rounded-12 border px-3 py-2" />
      <div className="flex justify-end">
        <button className="btn-primary rounded-24 px-4 py-2">Publish Job</button>
      </div>
    </form>
  );
}
