import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as companyService from '../services/companyService';
import * as postService from '../services/postService';
import * as contactService from '../services/contactService';
import api from '../services/api';

const DataContext = createContext(null);

function mapJobResponse(job) {
  return {
    id: job._id,
    title: job.title,
    description: job.description,
    location: job.location,
    salary: job.salary ? String(job.salary) : job.salary || 'TBD',
    experience: job.experience || 'Any',
    openings: job.openings ?? 1,
    skills: Array.isArray(job.requiredSkills) ? job.requiredSkills : [],
    jobType: job.employmentType || 'Full-time',
    status: job.status || 'Open',
    companyId: job.companyId?._id || job.companyId || null,
    company: job.companyId?.name || job.company || 'Unknown',
    recruiterId: job.recruiterId?._id || job.recruiterId || null,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    ...job
  };
}

function mapCompanyResponse(company) {
  return {
    id: company._id,
    companyId: company.companyId,
    name: company.name,
    companyName: company.name,
    industry: company.industry,
    description: company.description,
    website: company.website,
    hq: company.headquarters,
    locations: [company.headquarters],
    logoUrl: company.logoUrl,
    bannerUrl: company.bannerUrl,
    benefits: company.benefits || [],
    hiringRoles: company.hiringRoles || [],
    recruiterId: company.recruiterId,
    ...company
  };
}

export function DataProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load jobs from API
        const jobsRes = await api.get('/jobs');
        const mappedJobs = (jobsRes.data || []).map(mapJobResponse);
        setJobs(mappedJobs);
      } catch (error) {
        console.error('Failed to load jobs from API:', error?.response?.data || error.message || error);
      }

      try {
        // Load companies from API
        const companiesRes = await api.get('/companies');
        const mappedCompanies = (companiesRes.data || []).map(mapCompanyResponse);
        setCompanies(mappedCompanies);
      } catch (error) {
        console.error('Failed to load companies from API:', error?.response?.data || error.message || error);
        setCompanies(companyService.getCompanies());
      }
    };

    loadData();
    setPosts(postService.getPosts());
    setContacts(contactService.getContacts());
  }, []);

  const refresh = () => {
    setPosts(postService.getPosts());
    setContacts(contactService.getContacts());

    api.get('/jobs')
      .then((res) => {
        const mappedJobs = (res.data || []).map(mapJobResponse);
        setJobs(mappedJobs);
      })
      .catch((error) => {
        console.error('Failed to refresh jobs from API:', error?.response?.data || error.message || error);
      });

    api.get('/companies')
      .then((res) => {
        const mappedCompanies = (res.data || []).map(mapCompanyResponse);
        setCompanies(mappedCompanies);
      })
      .catch((error) => {
        console.error('Failed to refresh companies from API:', error?.response?.data || error.message || error);
      });
  };

  const publishJob = async (job) => {
    try {
      const payload = {
        title: String(job.title).trim(),
        companyId: job.companyId || undefined,
        location: String(job.location).trim(),
        salary: job.salary !== undefined ? Number(job.salary) : undefined,
        experience: job.experience ? String(job.experience).trim() : undefined,
        skills: Array.isArray(job.skills) ? job.skills : String(job.skills).split(',').map((skill) => skill.trim()).filter(Boolean),
        description: String(job.description).trim(),
        jobType: job.jobType || 'Full-time',
        openings: job.openings !== undefined ? Number(job.openings) : 1,
        status: job.status || 'active',
      };
      const res = await api.post('/jobs', payload);
      const createdJob = mapJobResponse(res.data.data.job);
      setJobs((current) => [createdJob, ...current]);
      return createdJob;
    } catch (err) {
      console.error('Failed to publish job via API:', err?.response?.data || err.message || err);
      throw err;
    }
  };

  const updateJob = async (jobId, job) => {
    try {
      const payload = {
        title: job.title ? String(job.title).trim() : undefined,
        location: job.location ? String(job.location).trim() : undefined,
        salary: job.salary !== undefined ? Number(job.salary) : undefined,
        experience: job.experience ? String(job.experience).trim() : undefined,
        skills: Array.isArray(job.skills) ? job.skills : String(job.skills).split(',').map((skill) => skill.trim()).filter(Boolean),
        description: job.description ? String(job.description).trim() : undefined,
        jobType: job.jobType ? String(job.jobType).trim() : undefined,
        openings: job.openings !== undefined ? Number(job.openings) : undefined,
        status: job.status ? String(job.status).trim() : undefined,
      };
      const res = await api.put(`/jobs/${jobId}`, payload);
      const updatedJob = mapJobResponse(res.data.data.job);
      setJobs((current) => current.map((item) => (item.id === jobId ? updatedJob : item)));
      return updatedJob;
    } catch (err) {
      console.error('Failed to update job via API:', err?.response?.data || err.message || err);
      throw err;
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs((current) => current.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error('Failed to delete job via API:', err?.response?.data || err.message || err);
      throw err;
    }
  };

  const applyJob = async (jobId, application) => {
    try {
      const payload = {
        jobId,
        resumeUrl: application.resumeUrl,
        coverLetter: application.coverLetter || application.q_why || application.cover_letter || '',
      };
      const res = await api.post('/applications', payload);
      return res.data;
    } catch (err) {
      console.error('DataContext.applyJob API error:', err?.response?.data || err.message || err);
      throw err;
    }
  };

  const saveCompany = (company) => {
    const created = companyService.saveCompany(company);
    setCompanies((current) => [created, ...current]);
    return created;
  };

  const addPost = (post) => {
    const created = postService.savePost(post);
    setPosts((current) => [created, ...current]);
    return created;
  };

  const addContact = (contact) => {
    const created = contactService.saveContact(contact);
    setContacts((current) => [created, ...current]);
    return created;
  };

  const value = useMemo(
    () => ({ jobs, companies, posts, contacts, publishJob, updateJob, deleteJob, applyJob, saveCompany, addPost, addContact, refresh }),
    [jobs, companies, posts, contacts]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
