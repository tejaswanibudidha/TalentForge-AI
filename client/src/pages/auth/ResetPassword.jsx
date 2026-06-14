import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/AuthLayout';
import { resetPassword } from '../../services/authService.js';

const STORAGE_EMAIL_KEY = 'talentforge_reset_email';
const STORAGE_OTP_KEY = 'talentforge_reset_otp';

export default function ResetPassword() {
  const navigate = useNavigate();
  const email = useMemo(() => sessionStorage.getItem(STORAGE_EMAIL_KEY) || '', []);
  const otp = useMemo(() => sessionStorage.getItem(STORAGE_OTP_KEY) || '', []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!email || !otp) {
      navigate('/forgot-password', { replace: true });
    }
  }, [email, otp, navigate]);

  const newPassword = watch('newPassword', '');

  const onSubmit = async (data) => {
    try {
      const result = await resetPassword(email, otp, data.newPassword);
      sessionStorage.removeItem(STORAGE_EMAIL_KEY);
      sessionStorage.removeItem(STORAGE_OTP_KEY);
      toast.success(result.message || 'Password reset successfully.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Unable to reset password.');
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Set a new secure password and return to your TalentForge AI dashboard."
      ctaText="Sign in"
      ctaLink="/login"
    >
      <div className="mx-auto w-full max-w-md rounded-[32px] bg-white p-8 shadow-lg shadow-slate-200">
        <p className="text-sm text-slate-500">Resetting account: <span className="font-semibold text-slate-900">{email || 'your email'}</span></p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">New password</label>
            <input
              type="password"
              {...register('newPassword', {
                required: 'New password is required.',
                minLength: { value: 8, message: 'Password must be at least 8 characters.' },
                pattern: { value: /^(?=.*\d)(?=.*[A-Za-z]).+$/, message: 'Password must include letters and numbers.' },
              })}
              placeholder="New password"
              className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
            {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Confirm password</label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password.',
                validate: (value) => value === newPassword || 'Passwords do not match.',
              })}
              placeholder="Confirm password"
              className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-[24px] bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:from-violet-700 hover:to-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Resetting…' : 'Reset Password'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
