import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [notification, setNotification] = useState(true);
  const [theme, setTheme] = useState('light');

  const save = (e) => {
    e.preventDefault();
    updateProfile({ notifications: notification, theme });
    alert('Settings saved locally');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-24 bg-white p-6 shadow">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-sm text-gray-500">Control your TalentForge AI experience.</p>
      </div>
      <form onSubmit={save} className="rounded-24 bg-white p-6 shadow space-y-6">
        <div>
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input type="checkbox" checked={notification} onChange={(e) => setNotification(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            Receive notifications for new applications and matches
          </label>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700">Theme preference</div>
          <div className="mt-3 flex gap-3">
            <button type="button" onClick={() => setTheme('light')} className={`rounded-18 px-4 py-2 text-sm font-medium ${theme === 'light' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
              Light
            </button>
            <button type="button" onClick={() => setTheme('dark')} className={`rounded-18 px-4 py-2 text-sm font-medium ${theme === 'dark' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
              Dark
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <AnimatedButton type="submit" className="rounded-24">Save settings</AnimatedButton>
        </div>
      </form>
    </div>
  );
}
