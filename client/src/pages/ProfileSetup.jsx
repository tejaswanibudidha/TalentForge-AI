import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AnimatedButton from '../components/ui/AnimatedButton';

const joinArray = (value, delimiter = ', ') => {
  if (Array.isArray(value)) return value.join(delimiter);
  if (!value) return '';
  return value;
};

const parseCommaList = (value) =>
  String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const parseLineList = (value) =>
  String(value)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const calculateCompletion = (profile) => {
  const fields = [
    'headline',
    'summary',
    'location',
    'skills',
    'education',
    'experience',
    'projects',
    'certifications',
    'achievements',
    'portfolioLinks',
    'linkedIn',
    'github',
    'resume'
  ];

  const filled = fields.reduce((count, field) => {
    const value = profile[field];
    if (Array.isArray(value)) {
      return count + (value.length > 0 ? 1 : 0);
    }
    return count + (!!String(value).trim() ? 1 : 0);
  }, 0);

  return Math.round((filled / fields.length) * 100);
};

export default function ProfileSetup() {
  const { user, updateProfile } = useAuth();
  const initialProfile = user?.profile || {};
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    headline: initialProfile.headline || '',
    summary: initialProfile.summary || initialProfile.about || '',
    location: initialProfile.location || '',
    mobile: initialProfile.mobile || '',
    skills: joinArray(initialProfile.skills),
    education: joinArray(initialProfile.education, '\n'),
    experience: joinArray(initialProfile.experience, '\n'),
    projects: joinArray(initialProfile.projects, '\n'),
    certifications: joinArray(initialProfile.certifications),
    achievements: joinArray(initialProfile.achievements, '\n'),
    portfolioLinks: joinArray(initialProfile.portfolioLinks, '\n'),
    linkedIn: initialProfile.linkedIn || '',
    github: initialProfile.github || '',
    resume: initialProfile.resume || ''
  });

  const profileCompletion = useMemo(() => calculateCompletion({
    headline: form.headline,
    summary: form.summary,
    location: form.location,
    skills: parseCommaList(form.skills),
    education: parseLineList(form.education),
    experience: parseLineList(form.experience),
    projects: parseLineList(form.projects),
    certifications: parseCommaList(form.certifications),
    achievements: parseLineList(form.achievements),
    portfolioLinks: parseLineList(form.portfolioLinks),
    linkedIn: form.linkedIn,
    github: form.github,
    resume: form.resume
  }), [form]);

  const save = (e) => {
    e.preventDefault();
    updateProfile({
      fullName: form.fullName,
      headline: form.headline,
      summary: form.summary,
      location: form.location,
      mobile: form.mobile,
      skills: parseCommaList(form.skills),
      education: parseLineList(form.education),
      experience: parseLineList(form.experience),
      projects: parseLineList(form.projects),
      certifications: parseCommaList(form.certifications),
      achievements: parseLineList(form.achievements),
      portfolioLinks: parseLineList(form.portfolioLinks),
      linkedIn: form.linkedIn,
      github: form.github,
      resume: form.resume
    });
    alert('Profile saved locally.');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Professional Portfolio</div>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Edit your recruiter-ready profile</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">Complete every section for better discovery, stronger applications, and higher recruiter response rates.</p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-800">
            Profile completion: <span className="text-slate-900">{profileCompletion}%</span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Personal details</div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="text-sm font-medium text-slate-700">Full Name</div>
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </label>
                <label className="block">
                  <div className="text-sm font-medium text-slate-700">Headline</div>
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    value={form.headline}
                    onChange={(e) => setForm({ ...form, headline: e.target.value })}
                    placeholder="Senior Product Designer, Tech Lead, Data Engineer"
                  />
                </label>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="text-sm font-medium text-slate-700">Location</div>
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Bengaluru, India"
                  />
                </label>
                <label className="block">
                  <div className="text-sm font-medium text-slate-700">Mobile number</div>
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Headline & summary</div>
              <div className="mt-6 space-y-4">
                <label className="block">
                  <div className="text-sm font-medium text-slate-700">Summary</div>
                  <textarea
                    className="mt-2 h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    placeholder="Experienced product leader with a track record of launching data-driven products for fintech teams."
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Resume & links</div>
              <div className="mt-6 space-y-4">
                <label className="block">
                  <div className="text-sm font-medium text-slate-700">Resume URL or file description</div>
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    value={form.resume}
                    onChange={(e) => setForm({ ...form, resume: e.target.value })}
                    placeholder="https://drive.google.com/your-resume or Resume: Senior Product Manager"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <div className="text-sm font-medium text-slate-700">LinkedIn profile</div>
                    <input
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      value={form.linkedIn}
                      onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
                      placeholder="https://linkedin.com/in/your-name"
                    />
                  </label>
                  <label className="block">
                    <div className="text-sm font-medium text-slate-700">GitHub profile</div>
                    <input
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                      value={form.github}
                      onChange={(e) => setForm({ ...form, github: e.target.value })}
                      placeholder="https://github.com/your-username"
                    />
                  </label>
                </div>
                <label className="block">
                  <div className="text-sm font-medium text-slate-700">Portfolio links</div>
                  <textarea
                    className="mt-2 h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    value={form.portfolioLinks}
                    onChange={(e) => setForm({ ...form, portfolioLinks: e.target.value })}
                    placeholder="https://portfolio.example.com\nhttps://dribbble.com/your-username"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Skill & credentials</div>
              <div className="mt-6 space-y-4">
                <label className="block">
                  <div className="text-sm font-medium text-slate-700">Skills</div>
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    value={form.skills}
                    onChange={(e) => setForm({ ...form, skills: e.target.value })}
                    placeholder="React, Node.js, Product Strategy, SQL"
                  />
                </label>
                <label className="block">
                  <div className="text-sm font-medium text-slate-700">Certifications</div>
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    value={form.certifications}
                    onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                    placeholder="PMP, AWS Certified Solutions Architect, Scrum Master"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Experience</div>
              <div className="mt-4 text-sm text-slate-500">Enter each role on a new line, including title, company, and outcome.</div>
              <textarea
                className="mt-4 h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                placeholder="Senior Product Manager at FinTechX — Led launch of payments platform that drove 20% revenue growth.\nLead Developer at CyberWave — Built a data pipeline for real-time insights."
              />
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Education</div>
              <div className="mt-4 text-sm text-slate-500">Enter each credential on a new line.</div>
              <textarea
                className="mt-4 h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                value={form.education}
                onChange={(e) => setForm({ ...form, education: e.target.value })}
                placeholder="B.Tech in Computer Science — IIT Bombay — 2022\nM.Sc. in Data Science — IIIT Hyderabad — 2024"
              />
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Projects</div>
              <div className="mt-4 text-sm text-slate-500">Enter each project on a new line.</div>
              <textarea
                className="mt-4 h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                value={form.projects}
                onChange={(e) => setForm({ ...form, projects: e.target.value })}
                placeholder="TalentForge AI — Built candidate matching dashboard for recruiter teams.\nPortfolio website — Designed a modern personal brand site with case studies."
              />
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Achievements</div>
              <div className="mt-4 text-sm text-slate-500">Enter each achievement on a new line.</div>
              <textarea
                className="mt-4 h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                value={form.achievements}
                onChange={(e) => setForm({ ...form, achievements: e.target.value })}
                placeholder="Reduced time-to-hire by 30% through automated screening.\nPresented product vision to executive leadership."
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Profile preview</div>
              <div className="mt-6 space-y-4">
                <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                  <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Visibility</div>
                  <div className="mt-3 text-2xl font-semibold text-slate-900">{profileCompletion}% complete</div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" style={{ width: `${profileCompletion}%` }} />
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                  <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Linked accounts</div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                      <span>LinkedIn</span>
                      <span className="font-medium text-slate-900">{form.linkedIn ? 'Connected' : 'Not connected'}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                      <span>GitHub</span>
                      <span className="font-medium text-slate-900">{form.github ? 'Connected' : 'Not connected'}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                  <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Profile content</div>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <p><span className="font-semibold">Resume:</span> {form.resume ? 'Added' : 'Missing'}</p>
                    <p><span className="font-semibold">Skills:</span> {form.skills ? parseCommaList(form.skills).length : 0}</p>
                    <p><span className="font-semibold">Projects:</span> {form.projects ? parseLineList(form.projects).length : 0}</p>
                    <p><span className="font-semibold">Experience:</span> {form.experience ? parseLineList(form.experience).length : 0}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-700">Visibility suggestions</div>
              <p className="mt-3 text-sm text-slate-500">These items help your profile perform better in recruiter searches and AI match scoring.</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {!form.headline && <li className="rounded-2xl bg-slate-100 px-4 py-3">Add a concise headline that highlights your specialty.</li>}
                {!form.summary && <li className="rounded-2xl bg-slate-100 px-4 py-3">Write a summary that communicates your career highlights.</li>}
                {!form.skills && <li className="rounded-2xl bg-slate-100 px-4 py-3">Add core skills to improve recruiter match.</li>}
                {!form.projects && <li className="rounded-2xl bg-slate-100 px-4 py-3">Showcase projects with links or outcomes.</li>}
                {!form.linkedIn && <li className="rounded-2xl bg-slate-100 px-4 py-3">Link your LinkedIn profile for credibility.</li>}
                {!form.github && <li className="rounded-2xl bg-slate-100 px-4 py-3">Connect your GitHub profile for technical visibility.</li>}
                {!form.resume && <li className="rounded-2xl bg-slate-100 px-4 py-3">Link or describe your resume so recruiters can review it quickly.</li>}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <AnimatedButton type="submit" onClick={save} className="rounded-full px-8 py-3">Save Portfolio</AnimatedButton>
        </div>
      </div>
    </div>
  );
}
