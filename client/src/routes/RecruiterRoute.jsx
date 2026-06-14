import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RecruiterRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'recruiter') {
    return <Navigate to="/home" replace />;
  }

  return children;
}
