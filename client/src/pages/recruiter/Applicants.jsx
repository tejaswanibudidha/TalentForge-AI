import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import {
  Search,
  Filter,
  BarChart3,
  ChevronDown,
  Briefcase,
} from "lucide-react";
import CandidateEvaluationCard from "../../components/recruiter/CandidateEvaluationCard";
import CandidateAISummary from "../../components/recruiter/CandidateAISummary";
import ResumeViewerModal from "../../components/recruiter/ResumeViewerModal";
import InterviewSchedulerModal from "../../components/recruiter/InterviewSchedulerModal";

// Mock candidates data
const mockCandidates = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Senior Full Stack Engineer",
    experience: "5+ years",
    location: "Bengaluru",
    resumeScore: 94,
    atsScore: 91,
    skillMatch: 96,
    rank: 1,
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    education: "B.Tech in Computer Science",
    university: "IIT Bombay",
    status: "Applied",
    strength: "Exceptional full-stack expertise with proven track record at leading tech companies",
    consideration: "Some differences in specific AWS services experience",
    opportunity: "Strong potential for technical leadership roles",
    assessment: "Highly recommended for senior engineering positions. Demonstrates excellent problem-solving skills and system design expertise.",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Full Stack Engineer",
    experience: "4 years",
    location: "Mumbai",
    resumeScore: 87,
    atsScore: 84,
    skillMatch: 88,
    rank: 2,
    skills: ["React", "Python", "AWS", "MongoDB", "Git"],
    education: "B.Tech in IT",
    university: "Delhi Technological University",
    status: "Applied",
    strength: "Strong problem-solving abilities with diverse tech stack knowledge",
    consideration: "Limited system design experience",
    opportunity: "Good candidate for mid-level engineering roles with mentorship",
    assessment: "Good fit for mid-level positions. Shows solid fundamentals and willingness to learn new technologies.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Frontend Engineer",
    experience: "3 years",
    location: "Hyderabad",
    resumeScore: 89,
    atsScore: 86,
    skillMatch: 85,
    rank: 3,
    skills: ["React", "Vue.js", "CSS", "JavaScript", "Figma"],
    education: "B.Tech in CS",
    university: "IIIT Hyderabad",
    status: "Applied",
    strength: "Excellent UI/UX sensibilities with strong React knowledge",
    consideration: "Backend integration experience could be stronger",
    opportunity: "Perfect fit for frontend-focused roles",
    assessment: "Excellent frontend engineer with eye for design. Great potential for growth.",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Backend Engineer",
    experience: "6 years",
    location: "Delhi",
    resumeScore: 92,
    atsScore: 89,
    skillMatch: 94,
    rank: 4,
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "Kubernetes"],
    education: "B.Tech in CSE",
    university: "NSIT Delhi",
    status: "Applied",
    strength: "Deep backend and database expertise with strong architectural knowledge",
    consideration: "Frontend experience minimal",
    opportunity: "Strong candidate for backend platform engineering",
    assessment: "Top candidate for backend/platform engineering roles. Extensive experience with scalable systems.",
  },
];

export default function ApplicantsPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewCandidate, setInterviewCandidate] = useState(null);
  const [expandedCandidate, setExpandedCandidate] = useState(null);

  const filteredAndSorted = useMemo(() => {
    let filtered = mockCandidates.filter((candidate) =>
      [candidate.name, candidate.role, candidate.skills.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (sortBy === "rank") {
      filtered.sort((a, b) => a.rank - b.rank);
    } else if (sortBy === "resumeScore") {
      filtered.sort((a, b) => b.resumeScore - a.resumeScore);
    } else if (sortBy === "skillMatch") {
      filtered.sort((a, b) => b.skillMatch - a.skillMatch);
    }

    return filtered;
  }, [search, sortBy]);

  const handleViewResume = (candidate) => {
    setSelectedCandidate(candidate);
    setShowResumeModal(true);
  };

  const handleScheduleInterview = (candidate) => {
    setInterviewCandidate(candidate);
    setShowInterviewModal(true);
  };

  const handleScheduleSubmit = (formData) => {
    console.log("Interview scheduled for", interviewCandidate.name, formData);
    setShowInterviewModal(false);
    alert(`Interview scheduled for ${interviewCandidate.name}`);
  };

  const handleShortlist = (candidateId, isShortlisted) => {
    console.log(`Candidate ${candidateId} shortlisted: ${isShortlisted}`);
  };

  const handleReject = (candidateId, isRejected) => {
    console.log(`Candidate ${candidateId} rejected: ${isRejected}`);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 py-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-[2rem] border border-slate-200 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-12 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3),_transparent_50%)]"></div>
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm border border-white/30">
            <BarChart3 size={18} />
            <span className="font-semibold">Applicant Management</span>
          </div>
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Evaluate & Shortlist Candidates
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              AI-powered candidate evaluation with resume analysis, skill matching,
              and intelligent ranking to help you find the perfect candidates.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        variants={itemVariants}
        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by name, role, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-slate-600" />
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Top Ranked", value: "rank" },
              { label: "Resume Score", value: "resumeScore" },
              { label: "Skill Match", value: "skillMatch" },
            ].map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSortBy(option.value)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  sortBy === option.value
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600 font-medium">
            Showing {filteredAndSorted.length} of {mockCandidates.length} candidates
          </p>
        </div>
      </motion.div>

      {/* Candidates Grid with Detailed View */}
      <motion.div variants={containerVariants} className="space-y-6">
        {filteredAndSorted.map((candidate, idx) => (
          <motion.div
            key={candidate.id}
            variants={itemVariants}
            className="space-y-4"
          >
            {/* Card */}
            <div onClick={() => setExpandedCandidate(expandedCandidate === candidate.id ? null : candidate.id)} className="cursor-pointer">
              <CandidateEvaluationCard
                candidate={candidate}
                onViewResume={handleViewResume}
                onScheduleInterview={handleScheduleInterview}
                onShortlist={handleShortlist}
                onReject={handleReject}
              />
            </div>

            {/* Expanded AI Summary */}
            {expandedCandidate === candidate.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <CandidateAISummary candidate={candidate} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredAndSorted.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="rounded-[2rem] border-2 border-dashed border-slate-300 bg-white p-12 text-center"
        >
          <p className="text-6xl mb-4">🔍</p>
          <h3 className="text-2xl font-bold text-slate-900">No candidates found</h3>
          <p className="text-slate-600 mt-2">
            Try adjusting your search filters to find candidates
          </p>
        </motion.div>
      )}

      {/* Modals */}
      {selectedCandidate && (
        <ResumeViewerModal
          isOpen={showResumeModal}
          candidate={selectedCandidate}
          onClose={() => setShowResumeModal(false)}
        />
      )}

      {interviewCandidate && (
        <InterviewSchedulerModal
          isOpen={showInterviewModal}
          candidate={interviewCandidate}
          onClose={() => setShowInterviewModal(false)}
          onSchedule={handleScheduleSubmit}
        />
      )}
    </motion.div>
  );
}
