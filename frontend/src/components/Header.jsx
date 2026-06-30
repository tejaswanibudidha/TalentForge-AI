import { NavLink } from 'react-router-dom';

function Header() {
  const links = [
    { label: 'Dashboard', to: '/' },
    { label: 'Profile', to: '/profile' },
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' }
  ];

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-brand-900">TalentForge AI</h1>
          <p className="text-sm text-slate-500">Job seeker dashboard and resume intelligence.</p>
        </div>
        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium ${isActive ? 'bg-brand-800 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
