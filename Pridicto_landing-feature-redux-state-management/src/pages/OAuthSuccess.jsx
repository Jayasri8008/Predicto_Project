import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const processOAuth = async () => {
      try {
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        const firstName = searchParams.get('firstName');
        const lastName = searchParams.get('lastName');

        if (!token || !email) {
          setError('Missing authentication information');
          setIsProcessing(false);
          return;
        }

        // Store the token and user info
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          email,
          firstName,
          lastName
        }));

        // Simulate successful login
        // In a real app, you would validate the token and create a session
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 2000);

      } catch (err) {
        console.error('OAuth processing error:', err);
        setError('Authentication failed. Please try again.');
        setIsProcessing(false);
        
        // Redirect to login after showing error
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    processOAuth();
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950/20 via-indigo-50 to-purple-50 from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 bg-red-900/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">Authentication Error</h2>
          <p className="text-gray-600 text-gray-300 mb-6">{error}</p>
          <p className="text-sm text-gray-500 text-gray-400">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950/20 via-indigo-50 to-purple-50 from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600 text-green-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">
          Welcome to Predicto AI!
        </h2>
        <p className="text-gray-600 text-gray-300 mb-6">
          Successfully signed in with Google/GitHub. Setting up your account...
        </p>
        <LoadingSpinner />
        <p className="text-sm text-gray-500 text-gray-400 mt-4">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );
}