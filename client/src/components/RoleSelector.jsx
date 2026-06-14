import { motion } from 'framer-motion';
import { Building, User } from 'lucide-react';

const roles = [
  {
    id: 'jobseeker',
    label: 'Job Seeker',
    description: 'Find opportunities and build your career.',
    Icon: User
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    description: 'Hire top talent and manage recruitment.',
    Icon: Building
  }
];

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {roles.map((role) => {
        const selected = value === role.id;
        return (
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            key={role.id}
            type="button"
            onClick={() => onChange(role.id)}
            className={`group relative flex flex-col gap-4 rounded-[24px] border p-6 text-left transition ${
              selected
                ? 'border-violet-500 bg-violet-50 shadow-[0_20px_60px_rgba(79,70,229,0.18)]'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg'
            }`}
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-violet-600">
              <role.Icon size={20} />
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 text-lg font-semibold text-slate-900">
                <span>{role.label}</span>
                {selected && <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">Selected</span>}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{role.description}</p>
            </div>
            <span className={`absolute inset-x-0 bottom-0 h-1 rounded-full ${selected ? 'bg-violet-500' : 'bg-slate-100'}`} />
          </motion.button>
        );
      })}
    </div>
  );
}
