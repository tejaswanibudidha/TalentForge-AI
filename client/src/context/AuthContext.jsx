import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getUser());
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      authService.saveUser(user);
    }
  }, [user]);

  const register = async (payload) => {
    const createdUser = await authService.register(payload);
    setUser(createdUser);
    if (createdUser.role === 'recruiter') {
      navigate('/company/setup');
    } else {
      navigate('/profile/setup');
    }
    return createdUser;
  };

  const login = async ({ email, password }) => {
    const loggedUser = await authService.login({ email, password });
    setUser(loggedUser);
    if (loggedUser.role === 'recruiter') {
      navigate('/recruiter/dashboard');
    } else {
      navigate('/home');
    }
    return loggedUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  const updateProfile = (updates) => {
    const nextUser = {
      ...user,
      fullName: updates.fullName ?? user?.fullName,
      companyName: updates.companyName ?? user?.companyName,
      profile: {
        ...(user?.profile || {}),
        ...updates
      },
      profileCompleted: true
    };
    setUser(nextUser);
    authService.saveUser(nextUser);
    return nextUser;
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, register, login, logout, updateProfile }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
