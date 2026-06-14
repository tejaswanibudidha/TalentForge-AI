import { Link } from 'react-router-dom';
import { Award, Briefcase, FileText, Github, Linkedin, Link2, MapPin, Sparkles, Trophy, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const normalizeList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
};

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

  const completed = fields.reduce((count, field) => {
    const value = profile[field];
    if (Array.isArray(value)) {
      return count + (value.length > 0 ? 1 : 0);
    }
    return count + (!!String(value).trim() ? 1 : 0);
  }, 0);

  return Math.round((completed / fields.length) * 100);
};

const buildSuggestions = (profile) => {
  const suggestions = [];

  if (!profile.headline) suggestions.push('Add a strong headline to show your career focus.');
  if (!profile.summary) suggestions.push('Write a concise summary to highlight your professional brand.');
  if (!profile.skills || normalizeList(profile.skills).length < 5) suggestions.push('Add more relevant skills to match recruiter searches.');
  if (!profile.experience || normalizeList(profile.experience).length === 0) suggestions.push('List recent experience entries with outcomes and responsibilities.');
  if (!profile.education || normalizeList(profile.education).length === 0) suggestions.push('Add your education history to improve credibility.');
  if (!profile.projects || normalizeList(profile.projects).length === 0) suggestions.push('Showcase projects that demonstrate real impact.');
  if (!profile.certifications || normalizeList(profile.certifications).length === 0) suggestions.push('Add certifications to strengthen your technical profile.');
  if (!profile.achievements || normalizeList(profile.achievements).length === 0) suggestions.push('Add measurable achievements to stand out.');
  if (!profile.portfolioLinks || normalizeList(profile.portfolioLinks).length === 0) suggestions.push('Include portfolio or website links recruiters can click.');
  if (!profile.linkedIn) suggestions.push('Connect your LinkedIn profile for recruiter visibility.');
  if (!profile.github) suggestions.push('Connect GitHub to showcase your code work.');
  if (!profile.resume) suggestions.push('Upload or link your resume to complete the professional snapshot.');

  return suggestions.slice(0, 5);
};

export default function ProfilePage() {
  const { user } = useAuth();
  const profile = user?.profile || {};
  const skills = normalizeList(profile.skills);
  const education = normalizeList(profile.education);
  const experience = normalizeList(profile.experience);
  const projects = normalizeList(profile.projects);
  const certifications = normalizeList(profile.certifications);
  const achievements = normalizeList(profile.achievements);
  const portfolioLinks = normalizeList(profile.portfolioLinks);
  const completion = calculateCompletion(profile);
  const suggestions = buildSuggestions(profile);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-xl">
        <div className="grid gap-8 xl:grid-cols-[1.7fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-slate-100 shadow-sm">
                  <Sparkles className="h-4 w-4 text-emerald-300" />
                  Professional Portfolio
                </div>
                <h1 className="mt-4 text-4xl font-semibold text-white">{profile.headline || user?.fullName || 'TalentForge Professional'}</h1>
                <p className="mt-3 max-w-3xl text-base text-slate-300">{profile.summary || 'Build a recruiter-ready digital resume with experience, skills, projects, and career achievements.'}</p>
              </div>
              <Link
                to="/profile/setup"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/20"
              >
                Edit Portfolio
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Profile Strength</div>
                <p className="mt-4 text-3xl font-semibold text-white">{completion}%</p>
                <p className="mt-2 text-sm text-slate-300">Visibility score across recruiter filters.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Skills</div>
                <p className="mt-4 text-3xl font-semibold text-white">{skills.length}</p>
                <p className="mt-2 text-sm text-slate-300">Skills listed for match scoring.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Projects</div>
                <p className="mt-4 text-3xl font-semibold text-white">{projects.length}</p>
                <p className="mt-2 text-sm text-slate-300">Featured portfolio entries.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Experience</div>
                <p className="mt-4 text-3xl font-semibold text-white">{experience.length}</p>
                <p className="mt-2 text-sm text-slate-300">Career history sections completed.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-900/80 p-6 shadow-inner">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Visibility Guide</div>
                <p className="mt-2 text-sm text-slate-300">How to improve recruiter reach.</p>
              </div>
              <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">Top Priority</div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.5rem] bg-slate-950/80 p-4">
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400" style={{ width: `${completion}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                  <span>{completion}% completed</span>
                  <span>{skills.length + projects.length + certifications.length + achievements.length} contributions</span>
                </div>
              </div>
              <div className="grid gap-3">
                {suggestions.length > 0 ? (
                  suggestions.map((message, index) => (
                    <div key={index} className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
                      <span className="block text-slate-100">{index + 1}.</span>
                      <span>{message}</span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[1.5rem] bg-emerald-500/10 p-4 text-sm text-emerald-100">Your profile is fully optimized for recruiter visibility.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6">
          <section className="rounded-[2rem] bg-white p-6 shadow">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Snapshot</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Career Overview</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                <Briefcase className="h-4 w-4 text-slate-500" />
                {user?.role === 'recruiter' ? 'Recruiter' : 'Job Seeker'} Profile
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm text-slate-500">Location</div>
                  <div className="mt-3 text-base font-semibold text-slate-900">{profile.location || 'Not added yet'}</div>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm text-slate-500">Resume</div>
                  <div className="mt-3 text-base font-semibold text-slate-900">{profile.resume ? 'Uploaded' : 'Not added'}</div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm text-slate-500">LinkedIn</div>
                  <div className="mt-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                    <Linkedin className="h-4 w-4 text-sky-600" />
                    {profile.linkedIn ? (
                      <a className="text-slate-900 hover:text-slate-700" href={profile.linkedIn} target="_blank" rel="noreferrer">View profile</a>
                    ) : (
                      'Not linked'
                    )}
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm text-slate-500">GitHub</div>
                  <div className="mt-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                    <Github className="h-4 w-4" />
                    {profile.github ? (
                      <a className="text-slate-900 hover:text-slate-700" href={profile.github} target="_blank" rel="noreferrer">View profile</a>
                    ) : (
                      'Not linked'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Skills</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Core strengths</h2>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">{skill}</span>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">Add skills in profile setup to make this section visible.</div>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Experience</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Professional history</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {experience.length > 0 ? (
                experience.map((entry, index) => (
                  <div key={index} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-semibold text-slate-900">{entry}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">Add your work experience with employer, role, and impact statements.</div>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Education</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Academic credentials</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {education.length > 0 ? (
                education.map((entry, index) => (
                  <div key={index} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-semibold text-slate-900">{entry}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">Add your degree, institution, and graduation year to boost trust.</div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Projects</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Showcase work</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                <FileText className="h-4 w-4 text-slate-500" />
                Portfolio
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-semibold text-slate-900">{project}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">Highlight projects with links, outcomes, and tools used.</div>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Certifications</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Professional credentials</h2>
              </div>
              <Award className="h-6 w-6 text-amber-500" />
            </div>
            <div className="mt-6 space-y-3">
              {certifications.length > 0 ? (
                certifications.map((cert, index) => (
                  <div key={index} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">{cert}</div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">Add certifications to show verified knowledge areas.</div>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Achievements</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Career highlights</h2>
              </div>
              <Trophy className="h-6 w-6 text-indigo-500" />
            </div>
            <div className="mt-6 space-y-3">
              {achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                  <div key={index} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">{achievement}</div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">Share achievements that quantify your impact.</div>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Portfolio</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Recruiter-ready links</h2>
              </div>
              <Link2 className="h-6 w-6 text-slate-500" />
            </div>
            <div className="mt-6 space-y-3">
              {portfolioLinks.length > 0 ? (
                portfolioLinks.map((link, index) => (
                  <a key={index} href={link} target="_blank" rel="noreferrer" className="block rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 transition hover:bg-slate-100">{link}</a>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">Add portfolio links to showcase live work.</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
