function ResourcesCard({ resources }) {
  if (!resources) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Recommended Learning Resources</h3>
        <p className="mt-3 text-slate-600">Complete an evaluation to receive course suggestions tied to your missing skills.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">Recommended Learning Resources</h3>
      <div className="mt-6 space-y-4">
        {resources.map((item, index) => (
          <div key={index} className="rounded-3xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-semibold text-slate-900">{item.skill}</h4>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">{item.platform}</span>
            </div>
            <p className="mt-2 text-slate-600">{item.course}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesCard;
