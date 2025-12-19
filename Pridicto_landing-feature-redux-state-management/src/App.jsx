import React, { Suspense, lazy, useEffect } from 'react';
import AuthPage from "./pages/AuthPage";

import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Toast from './components/Toast';
import useAnalytics from './hooks/useAnalytics';
import ForgotPassword from './pages/ForgotPassword';


// Lazy-loaded pages
const PredictoLanding = lazy(() => import('./pages/PredictoLanding'));
const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Insights = lazy(() => import('./pages/Insights'));
const GlobalPresence = lazy(() => import('./pages/GlobalPresence'));
const Contact = lazy(() => import('./pages/Contact'));
const EstimationForm = lazy(() => import('./pages/EstimationForm'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Comparison = lazy(() => import('./pages/Comparison'));
const Login = lazy(() => import('./pages/Login'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Suggestions = lazy(() => import('./pages/Suggestions'));

export default function App() {
  const { theme } = useSelector((state) => state.ui);
  useAnalytics();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading page..." />}>
            <Toast />
            <Routes>
              <Route path="/" element={<PredictoLanding />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/estimate" element={<EstimationForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/global-presence" element={<GlobalPresence />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/auth" element={<AuthPage />} />

            </Routes>
            <Chatbot />
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
