function SkillGapCard({ data }) {
  if (!data) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Skill Gap Analysis</h3>
        <p className="mt-4 text-slate-600">Run skill gap analysis after a resume upload to compare your skills with job requirements.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">Skill Gap Analysis</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-700">Existing Skills</h4>
          <p className="mt-2 text-slate-600">{data.existingSkills?.join(', ') || 'None detected'}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-700">Missing Skills</h4>
          <p className="mt-2 text-slate-600">{data.missingSkills?.join(', ') || 'None'}</p>
        </div>
      </div>
      <div className="mt-4 rounded-3xl bg-slate-50 p-4">
        <h4 className="font-semibold text-slate-700">Recommended Skills</h4>
        <p className="mt-2 text-slate-600">{data.recommendedSkills?.join(', ') || 'No recommendations yet'}</p>
      </div>
    </div>
  );
}

export default SkillGapCard;
