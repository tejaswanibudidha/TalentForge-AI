import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { FileText, CheckCircle, Clock, Eye, Trash2, Plus } from 'lucide-react';

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Load recruiter's applications
      const appsResponse = await api.get(`/applications/recruiter/${user.id}`);
      setApplications(appsResponse.data || []);

      // Load recruiter's jobs
      const jobsResponse = await api.get(`/jobs/recruiter/${user.id}`);
      setJobs(jobsResponse.data || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = filter === 'all'
    ? applications
    : applications.filter(app => app.applicationStatus === filter);

  const stats = {
    totalJobs: jobs.length,
    totalApplications: applications.length,
    shortlisted: applications.filter(a => a.applicationStatus === 'Shortlisted').length,
    interviewed: applications.filter(a => a.applicationStatus === 'Interview Scheduled').length,
    selected: applications.filter(a => a.applicationStatus === 'Selected').length
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      await api.put(`/applications/${applicationId}/status`, {
        applicationStatus: newStatus
      });
      loadData();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteApplication = async (applicationId) => {
    if (confirm('Are you sure you want to delete this application?')) {
      try {
        await api.delete(`/applications/${applicationId}`);
        loadData();
      } catch (error) {
        console.error('Failed to delete application:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Recruiter Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage job postings and applications</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Post New Job
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Active Jobs', value: stats.totalJobs, color: 'bg-blue-50', icon: '📋' },
            { label: 'Total Applications', value: stats.totalApplications, color: 'bg-purple-50', icon: '📄' },
            { label: 'Shortlisted', value: stats.shortlisted, color: 'bg-yellow-50', icon: '⭐' },
            { label: 'Interviews', value: stats.interviewed, color: 'bg-indigo-50', icon: '📞' },
            { label: 'Selected', value: stats.selected, color: 'bg-green-50', icon: '✅' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${stat.color} rounded-lg p-4 border`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Candidate</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Job Position</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">AI Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Skill Match</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <motion.tr
                    key={app._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{app.candidateId?.name}</p>
                        <p className="text-xs text-slate-600">{app.candidateId?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-900">{app.jobId?.title}</p>
                      <p className="text-xs text-slate-600">{app.companyId?.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="font-bold text-blue-600">{app.aiScore}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="font-bold text-green-600">{app.skillMatch}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={app.applicationStatus}
                        onChange={(e) => updateStatus(app._id, e.target.value)}
                        className="px-3 py-1 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'].map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setShowResumeModal(true);
                          }}
                          title="View Resume"
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteApplication(app._id)}
                          title="Delete Application"
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">No applications found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Resume Modal */}
        {showResumeModal && selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Candidate Profile</h2>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{selectedApp.candidateId?.name}</h3>
                  <p className="text-slate-600">{selectedApp.candidateId?.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.candidateId?.skills?.map((skill) => (
                      <span key={skill} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Education</h4>
                  {selectedApp.education?.map((edu, idx) => (
                    <div key={idx} className="mb-3 pb-3 border-b">
                      <p className="font-medium">{edu.degree} in {edu.field}</p>
                      <p className="text-slate-600 text-sm">{edu.institution} ({edu.graduationYear})</p>
                    </div>
                  ))}
                </div>
                {selectedApp.additionalInfo && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Additional Information</h4>
                    <p className="text-slate-600">{selectedApp.additionalInfo}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
