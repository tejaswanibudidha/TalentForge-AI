import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/AuthLayout';
import { forgotPassword, verifyOtp } from '../../services/authService.js';

const STORAGE_EMAIL_KEY = 'talentforge_reset_email';
const STORAGE_OTP_KEY = 'talentforge_reset_otp';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const email = useMemo(() => sessionStorage.getItem(STORAGE_EMAIL_KEY) || '', []);

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true });
    }
  }, [email, navigate]);

  const onSubmit = async (data) => {
    try {
      const result = await verifyOtp(email, data.otp.trim());
      sessionStorage.setItem(STORAGE_OTP_KEY, data.otp.trim());
      toast.success(result.message || 'OTP verified successfully.');
      navigate('/reset-password');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Unable to verify OTP.');
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unable to resend OTP.');
      }

      toast.success(result.message || 'OTP resent to your email.');
    } catch (error) {
      toast.error(error.message || 'Unable to resend OTP.');
    }
  };

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the one-time password from your email to continue the reset flow."
      ctaText="Back to email"
      ctaLink="/forgot-password"
    >
      <div className="mx-auto w-full max-w-md rounded-[32px] bg-white p-8 shadow-lg shadow-slate-200">
        <p className="text-sm text-slate-500">OTP will expire in 10 minutes. Use the email account you entered earlier.</p>
        <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">Resetting account: <span className="font-semibold text-slate-900">{email || 'unknown'}</span></div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">OTP code</label>
            <input
              type="text"
              maxLength={6}
              {...register('otp', {
                required: 'OTP is required.',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Enter a valid 6-digit OTP.',
                },
              })}
              placeholder="123456"
              className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
            {errors.otp && <p className="text-sm text-red-500">{errors.otp.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-[24px] bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:from-violet-700 hover:to-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Verifying…' : 'Verify OTP'}
          </button>

          <button
            type="button"
            onClick={resendOtp}
            className="inline-flex w-full items-center justify-center rounded-[24px] border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-500 hover:text-violet-600"
          >
            Resend OTP
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
