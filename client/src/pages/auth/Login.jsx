import AuthLayout from '../../components/AuthLayout';
import LoginForm from '../../components/LoginForm';

export default function Login() {
  return (
    <AuthLayout
      title="Sign in to TalentForge AI"
      subtitle="Secure access for recruiters and career builders with personalized dashboards and role-aware routing."
      ctaText="Create account"
      ctaLink="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
