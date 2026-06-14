import AuthLayout from '../../components/AuthLayout';
import RegisterForm from '../../components/RegisterForm';

export default function Register() {
  return (
    <AuthLayout
      title="Create your TalentForge AI account"
      subtitle="Register as a job seeker or recruiter and launch your hiring or career experience instantly."
      ctaText="Sign in"
      ctaLink="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
