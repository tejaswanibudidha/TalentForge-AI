import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/AuthLayout';
import { forgotPassword } from '../../services/authService.js';

const STORAGE_EMAIL_KEY = 'talentforge_reset_email';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      email: sessionStorage.getItem(STORAGE_EMAIL_KEY) || '',
    },
  });

  useEffect(() => {
    const savedEmail = sessionStorage.getItem(STORAGE_EMAIL_KEY);
    if (savedEmail) {
      setValue('email', savedEmail);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const result = await forgotPassword(data.email.trim());
      sessionStorage.setItem(STORAGE_EMAIL_KEY, data.email.trim());
      toast.success(result.message || 'OTP sent to your email.');
      navigate('/verify-otp');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Unable to send OTP.');
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email and we will send a one-time password to reset your account securely."
      ctaText="Sign in"
      ctaLink="/login"
    >
      <div className="mx-auto w-full max-w-md rounded-[32px] bg-white p-8 shadow-lg shadow-slate-200">
        <p className="text-sm text-slate-500">We will send a 6-digit OTP to your registered email address.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Email address</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              })}
              placeholder="hello@talentforge.ai"
              className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-[24px] bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:from-violet-700 hover:to-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending OTP…' : 'Send OTP'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
