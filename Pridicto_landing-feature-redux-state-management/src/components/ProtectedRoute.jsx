import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (user) {
      setIsVerifying(true);
      // Simulate role verification
      const timer = setTimeout(() => {
        setIsVerifying(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (isLoading || isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" message="Verifying access..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based access control
  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
}