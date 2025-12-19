import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiEye, 
  FiEyeOff, 
  FiMail, 
  FiLock, 
  FiUser, 
  FiUserPlus,
  FiGithub,
  FiChrome
} from 'react-icons/fi';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }

    try {
      await signup(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialSignup = (provider) => {
    // Redirect to OAuth provider
    if (provider === 'google') {
      window.location.href = 'http://localhost:8080/auth/oauth/google';
    } else if (provider === 'github') {
      window.location.href = 'http://localhost:8080/auth/oauth/github';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950/20 via-indigo-50 to-purple-50 from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 bg-slate-800/80 backdrop-blur rounded-3xl p-8 shadow-2xl border border-gray-200/50 border-slate-700/50"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg">
                P
              </div>
              <div>
                <h1 className="font-semibold text-xl bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Predicto</h1>
                <p className="text-xs text-gray-500">Smart AI Estimator</p>
              </div>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 text-gray-300">
              Join Predicto AI and start estimating projects with confidence
            </p>
          </div>

          {/* Social Signup */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignup('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 border-gray-600 rounded-lg text-gray-700 text-gray-300 hover:bg-gray-50 hover:bg-slate-700 transition-colors"
            >
              <FiChrome className="w-5 h-5" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialSignup('github')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 border-gray-600 rounded-lg text-gray-700 text-gray-300 hover:bg-gray-50 hover:bg-slate-700 transition-colors"
            >
              <FiGithub className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white bg-slate-800 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 bg-red-900/20 border border-red-200 border-red-800 rounded-lg text-red-700 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 border-gray-600 rounded-lg bg-white bg-slate-700 text-gray-900 text-white placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="First name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 border-gray-600 rounded-lg bg-white bg-slate-700 text-gray-900 text-white placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 border-gray-600 rounded-lg bg-white bg-slate-700 text-gray-900 text-white placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 border-gray-600 rounded-lg bg-white bg-slate-700 text-gray-900 text-white placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 border-gray-600 rounded-lg bg-white bg-slate-700 text-gray-900 text-white placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:text-gray-300"
                >
                  {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
                required
              />
              <span className="ml-2 text-sm text-gray-600 text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-indigo-600 hover:text-indigo-700 text-indigo-400">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700 text-indigo-400">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FiUserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 text-gray-300">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-700 text-indigo-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}