import { useState } from 'react';
import { useData } from '../../context/DataContext';
import AnimatedButton from '../../components/ui/AnimatedButton';

const team = [
  { name: 'Ananya Singh', role: 'Founder & CEO', avatar: '👩🏽‍💼' },
  { name: 'Rahul Mehra', role: 'Head of Product', avatar: '👨🏽‍💻' },
  { name: 'Priya Nair', role: 'Head of Growth', avatar: '👩🏽‍💼' }
];

export default function About() {
  const { addContact } = useData();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const submit = (e) => {
    e.preventDefault();
    addContact(form);
    setStatus('Your message has been sent.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-16 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">About TalentForge AI</p>
          <h1 className="text-4xl font-extrabold text-slate-900">AI-powered recruitment that connects talent with the right teams.</h1>
          <p className="text-slate-600">TalentForge AI is an AI-powered recruitment platform that helps recruiters discover top talent and helps job seekers find the right opportunities.</p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Mission</h3>
              <p className="text-slate-600">Our mission is to simplify hiring and career growth using AI.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Contact</h3>
              <p className="text-slate-600">Email: <a href="mailto:support@talentforge.ai" className="text-indigo-600">support@talentforge.ai</a></p>
              <p className="text-slate-600">Phone: +91 9876543210</p>
              <p className="text-slate-600">Location: India</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="rounded-3xl border border-slate-200 bg-white px-4 py-4 text-center text-slate-700 transition hover:bg-slate-50">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-3xl border border-slate-200 bg-white px-4 py-4 text-center text-slate-700 transition hover:bg-slate-50">GitHub</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-3xl border border-slate-200 bg-white px-4 py-4 text-center text-slate-700 transition hover:bg-slate-50">Twitter</a>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-semibold text-slate-900">Contact us</h2>
          <p className="mt-2 text-slate-600">Send your request and we’ll respond within one business day.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700" required />
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700" required />
            </div>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700" required />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 min-h-[160px]" required />
            <AnimatedButton type="submit" className="rounded-3xl">Send Message</AnimatedButton>
            {status && <p className="text-sm text-emerald-600">{status}</p>}
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900">Leadership Team</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-3xl">{member.avatar}</div>
              <div className="text-xl font-semibold text-slate-900">{member.name}</div>
              <p className="text-slate-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
