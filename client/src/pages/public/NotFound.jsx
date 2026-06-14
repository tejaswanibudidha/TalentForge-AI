import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-10 text-center shadow-2xl shadow-slate-950/40">
      <h1 className="text-6xl font-black text-white">404</h1>
      <p className="mt-4 text-xl text-slate-300">The page you are looking for could not be found.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-white transition hover:bg-brand-dark">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
