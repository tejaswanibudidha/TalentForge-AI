import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

function AtsChart({ ats }) {
  if (!ats) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">ATS Score</h3>
        <p className="mt-4 text-slate-600">Upload a resume and paste a job description to view the ATS score.</p>
      </div>
    );
  }

  const data = [{ name: 'Score', value: ats.score, fill: '#2563eb' }];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">ATS Score</h3>
        <span className="rounded-full bg-brand-800 px-3 py-1 text-sm text-white">{ats.score}%</span>
      </div>
      <div className="mt-6 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={data} startAngle={180} endAngle={-180}>
            <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 space-y-3 text-slate-600">
        <p>{ats.summary || 'Review missing keywords and formatting tips for your resume.'}</p>
      </div>
    </div>
  );
}

export default AtsChart;
