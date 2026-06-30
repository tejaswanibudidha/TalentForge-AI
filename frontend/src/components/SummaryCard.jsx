function SummaryCard({ title, data }) {
  return (
    <div className="rounded-3xl bg-brand-900/5 p-6 shadow-sm shadow-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-6 space-y-4">
        <div>
          <h4 className="font-semibold text-slate-700">Name</h4>
          <p className="text-slate-600">{data.name || 'N/A'}</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-700">Email</h4>
          <p className="text-slate-600">{data.email || 'N/A'}</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-700">Skills</h4>
          <p className="text-slate-600">{data.skills?.join(', ') || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
