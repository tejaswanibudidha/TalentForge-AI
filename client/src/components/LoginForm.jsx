import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AnimatedButton from './ui/AnimatedButton';
import toast from 'react-hot-toast';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  if (user) {
    return <Navigate to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/home'} replace />;
  }

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!emailPattern.test(form.email.trim())) next.email = 'Please provide a valid email address.';
    if (!form.password) next.password = 'Password is required.';
    return next;
  };

  const submit = async (event) => {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setProcessing(true);
    setErrors({});

    try {
      await login({ email: form.email.trim(), password: form.password });
      toast.success('Login successful.');
    } catch (error) {
      toast.error(error.message || 'Unable to login.');
      setErrors({ general: error.message || 'Invalid credentials.' });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-4">
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
        {errors.email && (
          <AnimatePresence>
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-sm text-red-500">
              {errors.email}
            </motion.p>
          </AnimatePresence>
        )}

        <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Lock size={16} /> Password
          </label>
          <input
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            type="password"
            placeholder="••••••••"
            className="mt-3 w-full bg-transparent text-base text-slate-900 outline-none"
          />
        </div>
        {errors.password && (
          <AnimatePresence>
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-sm text-red-500">
              {errors.password}
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-slate-500">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(event) => setForm({ ...form, remember: event.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
          />
          Remember me
        </label>
        <Link to="/forgot-password" className="text-sm font-semibold text-violet-600 transition hover:text-violet-500">
          Forgot password?
        </Link>
      </div>

      <div className="space-y-4">
        {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}
        <AnimatedButton type="submit" className="w-full rounded-[24px]" disabled={processing}>
          {processing ? 'Signing in...' : 'Continue to dashboard'}
        </AnimatedButton>
      </div>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-violet-600 transition hover:text-violet-500">
          Create account
        </Link>
      </p>
    </form>
  );
}
