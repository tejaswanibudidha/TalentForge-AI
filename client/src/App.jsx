import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import TalentForgeLandingPage from './components/landing/TalentForgeLandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOtp from './pages/auth/VerifyOtp';
import ResetPassword from './pages/auth/ResetPassword';
import NotFound from './pages/public/NotFound';
import Companies from './pages/public/Companies';
import CompanyDetails from './pages/public/CompanyDetails';
import Jobs from './pages/public/Jobs';
import Features from './pages/public/Features';
import About from './pages/public/About';
import Navbar from './components/common/Navbar';
import NavbarJobSeeker from './components/common/NavbarJobSeeker';
import NavbarRecruiter from './components/common/NavbarRecruiter';
import Footer from './components/common/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProfileSetup from './pages/ProfileSetup';
import CompanySetup from './pages/CompanySetup';
import Home from './pages/public/Home';
import RecruiterDashboard from './pages/recruiter/Dashboard';
import RecruiterCompany from './pages/recruiter/Company';
import RecruiterJobPostings from './pages/recruiter/JobPostings';
import RecruiterApplications from './pages/recruiter/Applications';
import RecruiterFeatures from './pages/recruiter/CompanyFeatures';
import JobDetails from './pages/JobDetails';
import Apply from './pages/public/Apply';
import JobseekerDashboard from './pages/jobseeker/Dashboard';
import CareerHub from './pages/jobseeker/CareerHub';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/Settings';
import ContactRequests from './pages/admin/ContactRequests';
import PageTransition from './components/ui/PageTransition';
import ProtectedRoute from './routes/ProtectedRoute';
import JobSeekerRoute from './routes/JobSeekerRoute';
import RecruiterRoute from './routes/RecruiterRoute';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><TalentForgeLandingPage /></PageTransition>} />
        <Route path="/talentforge" element={<PageTransition><TalentForgeLandingPage /></PageTransition>} />
        <Route path="/home" element={<JobSeekerRoute><PageTransition><Home /></PageTransition></JobSeekerRoute>} />
        <Route path="/features" element={<PageTransition><Features /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path="/verify-otp" element={<PageTransition><VerifyOtp /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
        <Route path="/companies" element={<PageTransition><Companies /></PageTransition>} />
        <Route path="/companies/:id" element={<PageTransition><CompanyDetails /></PageTransition>} />
        <Route path="/jobs" element={<PageTransition><Jobs /></PageTransition>} />
        <Route path="/profile/setup" element={<ProtectedRoute><PageTransition><ProfileSetup /></PageTransition></ProtectedRoute>} />
        <Route path="/company/setup" element={<ProtectedRoute><PageTransition><CompanySetup /></PageTransition></ProtectedRoute>} />
        <Route path="/dashboard" element={<JobSeekerRoute><PageTransition><JobseekerDashboard /></PageTransition></JobSeekerRoute>} />
        <Route path="/career-hub" element={<JobSeekerRoute><PageTransition><CareerHub /></PageTransition></JobSeekerRoute>} />
        <Route path="/recruiter/dashboard" element={<RecruiterRoute><PageTransition><RecruiterDashboard /></PageTransition></RecruiterRoute>} />
        <Route path="/recruiter/company" element={<RecruiterRoute><PageTransition><RecruiterCompany /></PageTransition></RecruiterRoute>} />
        <Route path="/recruiter/jobs" element={<RecruiterRoute><PageTransition><RecruiterJobPostings /></PageTransition></RecruiterRoute>} />
        <Route path="/recruiter/applications" element={<RecruiterRoute><PageTransition><RecruiterApplications /></PageTransition></RecruiterRoute>} />
        <Route path="/recruiter/features" element={<RecruiterRoute><PageTransition><RecruiterFeatures /></PageTransition></RecruiterRoute>} />
        <Route path="/jobs/:id" element={<PageTransition><JobDetails /></PageTransition>} />
        <Route path="/apply/:id" element={<PageTransition><Apply /></PageTransition>} />
        <Route path="/profile" element={<ProtectedRoute><PageTransition><ProfilePage /></PageTransition></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><PageTransition><SettingsPage /></PageTransition></ProtectedRoute>} />
        <Route path="/admin/contacts" element={<PageTransition><ContactRequests /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppLayout() {
  const location = useLocation();
  const landingPaths = ['/', '/talentforge'];
  const isLandingPage = landingPaths.includes(location.pathname);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600">
      {!isLandingPage && (user?.role === 'recruiter' ? <NavbarRecruiter /> : user?.role === 'jobseeker' ? <NavbarJobSeeker /> : <Navbar />)}
      <main className={!isLandingPage ? "px-4 py-8 sm:px-6 lg:px-10" : ""}>
        <AnimatedRoutes />
      </main>
      {!isLandingPage && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppLayout />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
