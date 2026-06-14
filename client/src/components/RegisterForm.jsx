import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Mail, Lock, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RoleSelector from './RoleSelector';
import AnimatedButton from './ui/AnimatedButton';
import toast from 'react-hot-toast';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterForm() {
  const { user, register } = useAuth();
  const [selectedRole, setSelectedRole] = useState('jobseeker');
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', companyName: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/home'} replace />;
  }

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required.';
    if (!form.email.trim()) next.email = 'Email address is required.';
    else if (!emailPattern.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters.';
    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password.';
    else if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';
    if (selectedRole === 'recruiter' && !form.companyName.trim()) next.companyName = 'Company name is required for recruiters.';
    return next;
  };

  const submit = async (event) => {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      await register({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        role: selectedRole,
        companyName: selectedRole === 'recruiter' ? form.companyName.trim() : undefined
      });
      toast.success('Registration successful. Redirecting...');
    } catch (error) {
      toast.error(error.message || 'Unable to register.');
      setErrors({ general: error.message || 'Account already exists.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Role selection</p>
        <p className="mt-2 text-sm text-slate-600">Choose the experience that fits your journey.</p>
      </div>
      <RoleSelector value={selectedRole} onChange={setSelectedRole} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <UserPlus size={16} /> Full name
          </label>
          <input
            value={form.fullName}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            type="text"
            placeholder="Alex Morgan"
            className="mt-3 w-full bg-transparent text-base text-slate-900 outline-none"
          />
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Mail size={16} /> Email address
          </label>
          <input
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            type="email"
            placeholder="hello@talentforge.ai"
            className="mt-3 w-full bg-transparent text-base text-slate-900 outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Lock size={16} /> Password
          </label>
          <input
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            type="password"
            placeholder="Create a password"
            className="mt-3 w-full bg-transparent text-base text-slate-900 outline-none"
          />
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Lock size={16} /> Confirm password
          </label>
          <input
            value={form.confirmPassword}
            onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
            type="password"
            placeholder="Repeat password"
            className="mt-3 w-full bg-transparent text-base text-slate-900 outline-none"
          />
        </div>
      </div>

      {selectedRole === 'recruiter' && (
        <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Building2 size={16} /> Company name
          </label>
          <input
            value={form.companyName}
            onChange={(event) => setForm({ ...form, companyName: event.target.value })}
            type="text"
            placeholder="Acme Recruiting"
            className="mt-3 w-full bg-transparent text-base text-slate-900 outline-none"
          />
        </div>
      )}

      <div className="space-y-4">
        {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}
        <div className="grid gap-3 sm:grid-cols-2">
          <AnimatedButton type="submit" className="w-full rounded-[24px]" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Create account'}
          </AnimatedButton>
          <div className="self-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-violet-600 transition hover:text-violet-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {Object.keys(errors).length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-[24px] border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            {errors.fullName || errors.email || errors.password || errors.confirmPassword || errors.companyName}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
