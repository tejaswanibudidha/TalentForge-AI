import { useState } from 'react';
import { useData } from '../../context/DataContext';
import AnimatedButton from '../../components/ui/AnimatedButton';
import api from '../../services/api';
import toast from 'react-hot-toast';

const team = [
  { name: 'Tejaswani Budidha', role: 'CEO & Founder', avatar: '👩🏽‍💼' },
  { name: 'LikithBabu Karanam', role: 'Head', avatar: '👨🏽‍💼' }
];

export default function About() {
  const { addContact } = useData();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setStatus('');

    if (!form.name.trim()) {
      return toast.error('Name is required.');
    }
    if (!form.email.trim()) {
      return toast.error('Email is required.');
    }
    if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
      return toast.error('Please enter a valid email address.');
    }
    if (!form.subject.trim()) {
      return toast.error('Subject is required.');
    }
    if (!form.message.trim()) {
      return toast.error('Message is required.');
    }

    setLoading(true);

    try {
      const response = await api.post('/contact', {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      if (response?.data?.success) {
        setStatus('Thank you for contacting TalentForge AI. Our team will get back to you shortly.');
        setForm({ name: '', email: '', subject: '', message: '' });
        toast.success('Message sent successfully');
        addContact({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        });
      } else {
        throw new Error(response?.data?.message || 'Unable to send message.');
      }
    } catch (err) {
      console.error('Contact form submit error:', err);
      toast.error(err?.response?.data?.message || 'Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
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
              <p className="text-slate-600">Email: <a href="mailto:talentforgeai@gmail.com" className="text-indigo-600">talentforgeai@gmail.com</a></p>
              <p className="text-slate-600">Phone: +91 9391643833</p>
              <p className="text-slate-600">Location: Rajam, India</p>
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
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="Email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
              />
            </div>
            <input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Subject"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
            />
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Message"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 min-h-[160px]"
            />
            <AnimatedButton type="submit" className="rounded-3xl" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </AnimatedButton>
            {status && <p className="text-sm text-emerald-600">{status}</p>}
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900">Leadership Team</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 justify-items-center max-w-4xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="max-w-sm w-full rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-lg hover:shadow-2xl transition-shadow">
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
