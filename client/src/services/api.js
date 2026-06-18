import axios from 'axios';

const USER_KEY = 'talentforge_current_user';

function getStoredToken() {
  if (typeof window === 'undefined') return null;

  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user?.token || null;
  } catch {
    return null;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
