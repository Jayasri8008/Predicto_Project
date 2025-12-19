import React, { useState } from 'react';
import { Lock, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function PasswordReset() {
  const [step, setStep] = useState('request'); // request, confirm, success
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const api = useApi();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email');
      return;
    }
    try {
      setLoading(true);
      await api.post('/password-reset/request', { email });
      setStatus('success');
      setMessage('Reset link sent to your email!');
      setStep('confirm');
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setStatus('error');
      setMessage('Please enter the reset token');
      return;
    }
    if (!newPassword.trim()) {
      setStatus('error');
      setMessage('Please enter a new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters');
      return;
    }
    try {
      setLoading(true);
      await api.post('/password-reset/confirm', {
        token,
        newPassword,
        confirmPassword,
      });
      setStatus('success');
      setMessage('Password reset successfully!');
      setStep('success');
      setEmail('');
      setToken('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setStep('request');
        setStatus(null);
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="w-6 h-6 text-purple-600 text-purple-400" />
        <h3 className="text-xl font-bold text-gray-900 text-white">Password Reset</h3>
      </div>

      {step === 'request' && (
        <form onSubmit={handleRequestReset} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            Send Reset Email
          </button>
        </form>
      )}

      {step === 'confirm' && (
        <form onSubmit={handleResetPassword} className="space-y-3">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter reset token from email"
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password (min 8 chars)"
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            Reset Password
          </button>
        </form>
      )}

      {step === 'success' && (
        <div className="flex items-center gap-2 p-3 bg-green-100 bg-green-900/30 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 text-green-400" />
          <span className="text-green-900 text-green-200">Password reset successfully!</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-100 bg-red-900/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 text-red-400" />
          <span className="text-red-900 text-red-200">{message}</span>
        </div>
      )}

      {status === 'success' && step !== 'success' && (
        <div className="flex items-center gap-2 p-3 bg-green-100 bg-green-900/30 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 text-green-400" />
          <span className="text-green-900 text-green-200">{message}</span>
        </div>
      )}
    </div>
  );
}
