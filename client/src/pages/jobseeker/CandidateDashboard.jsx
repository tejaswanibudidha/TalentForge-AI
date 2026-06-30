import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { FileText, Clock, Check, X, CheckCircle } from 'lucide-react';

const statusColors = {
  'Applied': { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100', text: 'text-blue-700' },
  'Under Review': { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'bg-yellow-100', text: 'text-yellow-700' },
  'Shortlisted': { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100', text: 'text-purple-700' },
  'Interview Scheduled': { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'bg-indigo-100', text: 'text-indigo-700' },
  'Selected': { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100', text: 'text-green-700' },
  'Rejected': { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-100', text: 'text-red-700' }
};

const statusSteps = ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected'];

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/applications/candidate/${user.id}`);
      setApplications(response.data || []);
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.applicationStatus === filter);

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.applicationStatus === 'Applied').length,
    reviewing: applications.filter(a => a.applicationStatus === 'Under Review').length,
    shortlisted: applications.filter(a => a.applicationStatus === 'Shortlisted').length,
    selected: applications.filter(a => a.applicationStatus === 'Selected').length,
    rejected: applications.filter(a => a.applicationStatus === 'Rejected').length
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Applied': return <Clock className="w-5 h-5" />;
      case 'Under Review': return <FileText className="w-5 h-5" />;
      case 'Shortlisted': return <Check className="w-5 h-5" />;
      case 'Interview Scheduled': return <CheckCircle className="w-5 h-5" />;
      case 'Selected': return <CheckCircle className="w-5 h-5" />;
      case 'Rejected': return <X className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusProgress = (status) => {
    const index = statusSteps.indexOf(status);
    return index >= 0 ? ((index + 1) / statusSteps.length) * 100 : 0;
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
          <p className="text-slate-600 mt-2">Track your job applications and their status</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: stats.total, color: 'bg-blue-50' },
            { label: 'Applied', value: stats.applied, color: 'bg-blue-50' },
            { label: 'Under Review', value: stats.reviewing, color: 'bg-yellow-50' },
            { label: 'Shortlisted', value: stats.shortlisted, color: 'bg-purple-50' },
            { label: 'Interviews', value: stats.shortlisted, color: 'bg-indigo-50' },
            { label: 'Selected', value: stats.selected, color: 'bg-green-50' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${stat.color} rounded-lg p-4 border`}
            >
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'Applied', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'].map((status) => (
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

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => {
              const colors = statusColors[application.applicationStatus];
              return (
                <motion.div
                  key={application._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${colors.bg} ${colors.border} border rounded-lg p-6 hover:shadow-lg transition-shadow`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Job Info */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{application.jobId?.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{application.companyId?.name}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        Applied: {new Date(application.appliedDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Scores */}
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-slate-600 font-medium">AI Score</p>
                        <div className="bg-white rounded-lg px-3 py-2 mt-1">
                          <p className="font-bold text-blue-600">{application.aiScore}%</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-medium">Skill Match</p>
                        <div className="bg-white rounded-lg px-3 py-2 mt-1">
                          <p className="font-bold text-green-600">{application.skillMatch}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-2">Status</p>
                      <div className={`${colors.icon} ${colors.text} rounded-lg px-3 py-2 flex items-center gap-2 w-fit`}>
                        {getStatusIcon(application.applicationStatus)}
                        <span className="font-semibold">{application.applicationStatus}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-2">Progress</p>
                      <div className="space-y-2">
                        <div className="bg-white rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${getStatusProgress(application.applicationStatus)}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                          />
                        </div>
                        <p className="text-xs text-slate-600">
                          {getStatusProgress(application.applicationStatus).toFixed(0)}% Complete
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">No applications found</p>
              <p className="text-slate-500 text-sm mt-1">Start applying to jobs to see them here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
