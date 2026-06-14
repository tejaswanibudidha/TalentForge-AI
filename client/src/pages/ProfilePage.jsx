import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const profile = user?.profile || {};

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-24 bg-white p-6 shadow">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Hello, {user?.fullName || 'TalentForge User'}</h1>
            <p className="text-sm text-gray-500">Your profile details and account settings are shown here.</p>
          </div>
          <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{user?.role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-24 bg-white p-6 shadow">
          <div className="text-sm uppercase tracking-[0.2em] text-gray-400">Contact</div>
          <p className="mt-4 text-lg font-semibold text-gray-900">{user?.email}</p>
          <p className="mt-2 text-sm text-gray-500">{profile.location || 'Location not set'}</p>
        </div>

        <div className="rounded-24 bg-white p-6 shadow lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">About</h2>
              <p className="mt-2 text-sm text-gray-500">Your current profile summary and skills.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <div className="text-sm text-gray-500">Full name</div>
              <div className="mt-1 text-base text-gray-900">{profile.fullName || user?.fullName || 'Not set'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Skills</div>
              <div className="mt-1 text-base text-gray-900">{profile.skills || 'Not set'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Bio</div>
              <div className="mt-1 text-base text-gray-900">{profile.about || 'Your professional story goes here.'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
