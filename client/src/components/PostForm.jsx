import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import AnimatedButton from './ui/AnimatedButton';

export default function PostForm() {
  const { user } = useAuth();
  const { addPost } = useData();
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [status, setStatus] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!user) {
      setStatus('Log in to submit a post.');
      return;
    }

    if (!form.title.trim() || !form.content.trim()) {
      setStatus('Please add both title and content.');
      return;
    }

    addPost({
      author: user.fullName || user.email,
      role: 'Job Seeker',
      title: form.title.trim(),
      content: form.content.trim(),
      tags: form.tags
    });

    setForm({ title: '', content: '', tags: '' });
    setStatus('Your project post was added successfully.');
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-slate-900">Share a project or update</h2>
      <p className="mt-2 text-slate-600">Post your latest project, achievements, or community updates for recruiters and candidates.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Project title"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
        />
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Describe the project or update"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 min-h-[140px]"
        />
        <input
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="Tags (comma separated)"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <AnimatedButton type="submit" className="rounded-3xl">Share update</AnimatedButton>
          {status && <p className="text-sm text-slate-600">{status}</p>}
        </div>
      </form>
    </div>
  );
}
