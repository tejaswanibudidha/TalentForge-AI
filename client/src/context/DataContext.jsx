import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as jobService from '../services/jobService';
import * as companyService from '../services/companyService';
import * as postService from '../services/postService';
import * as contactService from '../services/contactService';
import api from '../services/api';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setJobs(jobService.getJobs());
    setCompanies(companyService.getCompanies());
    setPosts(postService.getPosts());
    setContacts(contactService.getContacts());
  }, []);

  const refresh = () => {
    setJobs(jobService.getJobs());
    setCompanies(companyService.getCompanies());
    setPosts(postService.getPosts());
    setContacts(contactService.getContacts());
  };

  const publishJob = (job) => {
    const created = jobService.publishJob(job);
    setJobs((current) => [created, ...current]);
    return created;
  };

  const applyJob = async (jobId, application) => {
    // Send application to backend API; do not fallback to localStorage here.
    try {
      const payload = {
        jobId,
        resumeUrl: application.resumeNameData || application.resume || application.resumeUrl,
        coverLetter: application.q_why || application.coverLetter || application.cover_letter,
      };
      const res = await api.post('/applications', payload);
      // Optionally refresh local jobs after successful submission
      try {
        setJobs(jobService.getJobs());
      } catch (e) {
        // ignore
      }
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
    () => ({ jobs, companies, posts, contacts, publishJob, applyJob, saveCompany, addPost, addContact, refresh }),
    [jobs, companies, posts, contacts]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
