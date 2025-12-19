import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function EmailVerification() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);
  const [token, setToken] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const api = useApi();

  const handleSendEmail = async () => {
    try {
      setStatus('loading');
      const response = await api.post('/email-verification/send');
      setStatus('success');
      setMessage('Verification email sent! Check your inbox.');
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to send email');
    }
  };

  const handleVerifyEmail = async () => {
    if (!token.trim()) {
      setStatus('error');
      setMessage('Please enter the verification token');
      return;
    }
    try {
      setStatus('loading');
      const response = await api.post('/email-verification/verify', { token });
      setStatus('success');
      setMessage('Email verified successfully!');
      setToken('');
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Verification failed');
    }
  };

  const handleResendEmail = async () => {
    try {
      setStatus('loading');
      await api.post('/email-verification/resend');
      setStatus('success');
      setMessage('Verification email resent!');
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to resend email');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6 text-indigo-600 text-indigo-400" />
        <h3 className="text-xl font-bold text-gray-900 text-white">Email Verification</h3>
      </div>

      <div className="space-y-4">
        {user?.emailVerified && (
          <div className="flex items-center gap-2 p-3 bg-green-100 bg-green-900/30 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 text-green-400" />
            <span className="text-green-900 text-green-200">Email verified</span>
          </div>
        )}

        {!user?.emailVerified && (
          <div className="space-y-3">
            <button
              onClick={handleSendEmail}
              disabled={status === 'loading'}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              {status === 'loading' ? <Loader className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              Send Verification Email
            </button>

            <div className="space-y-2">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter verification token"
                className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white"
              />
              <button
                onClick={handleVerifyEmail}
                disabled={status === 'loading'}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                {status === 'loading' ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Verify Email
              </button>
            </div>

            <button
              onClick={handleResendEmail}
              disabled={status === 'loading'}
              className="w-full text-indigo-600 text-indigo-400 hover:underline py-2"
            >
              Resend Email
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-100 bg-green-900/30 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 text-green-400" />
            <span className="text-green-900 text-green-200">{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-100 bg-red-900/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 text-red-400" />
            <span className="text-red-900 text-red-200">{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
