import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as jobService from '../services/jobService';
import * as companyService from '../services/companyService';
import * as postService from '../services/postService';
import * as contactService from '../services/contactService';

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

  const applyJob = (jobId, application) => {
    try {
      // Attempt to POST to backend if API available
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl) {
        // eslint-disable-next-line no-console
        console.log('DataContext: backend API detected, use API for apply (frontend will still fallback).');
      }
      jobService.applyJob(jobId, application);
      // refresh local state
      setJobs(jobService.getJobs());
      return true;
    } catch (err) {
      console.error(err);
      return false;
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
