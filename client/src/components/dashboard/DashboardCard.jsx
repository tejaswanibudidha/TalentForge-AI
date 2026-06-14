function DashboardCard({ title, value, description }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="h-2 w-full rounded-t-3xl bg-gradient-to-r from-indigo-600 to-purple-600 -mt-6 mb-4" />
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <h3 className="mt-4 text-3xl font-extrabold text-indigo-700">{value}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default DashboardCard;
