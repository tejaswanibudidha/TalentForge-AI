function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="rounded-3xl bg-white p-10 text-center shadow-xl shadow-slate-200">
        <h1 className="text-4xl font-bold text-slate-900">404</h1>
        <p className="mt-4 text-slate-600">Page not found.</p>
        <a href="/" className="mt-6 inline-block rounded-2xl bg-brand-800 px-6 py-3 text-white hover:bg-brand-700">Back to dashboard</a>
      </div>
    </div>
  );
}

export default NotFoundPage;
