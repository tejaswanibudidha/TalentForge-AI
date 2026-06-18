import api from './api';

/**
 * Dashboard Service
 * Handles all API calls for dashboard metrics and data
 */

const dashboardService = {
  /**
   * Get recruiter dashboard metrics
   * Returns: atsScore, matchScore, totalCandidates, pipelineCount, topCandidates
   */
  getRecruiterMetrics: async () => {
    try {
      const response = await api.get('/dashboard/recruiter/metrics');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching recruiter metrics:', error);
      throw error;
    }
  },

  getPublicDashboardSummary: async () => {
    try {
      const response = await api.get('/dashboard/summary');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching public dashboard summary:', error);
      throw error;
    }
  },

  /**
   * Get recruiter dashboard overview
   * Returns: totalJobs, totalApplicants, shortlisted, interviews, selected
   */
  getRecruiterDashboard: async () => {
    try {
      const response = await api.get('/dashboard/recruiter');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching recruiter dashboard:', error);
      throw error;
    }
  },

  /**
   * Get jobseeker dashboard data
   * Returns: applicationsSubmitted, shortlistedJobs, interviewsScheduled, offersReceived, profileCompletion, recommendedJobs
   */
  getJobseekerDashboard: async () => {
    try {
      const response = await api.get('/dashboard/jobseeker');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching jobseeker dashboard:', error);
      throw error;
    }
  },
};

export default dashboardService;
