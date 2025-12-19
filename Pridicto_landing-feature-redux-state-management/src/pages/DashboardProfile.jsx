import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from './DashboardLayout';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import { updateProfile } from '../store/slices/authSlice';

export default function DashboardProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      dispatch(updateProfile(formData));
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/users/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      alert('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div
          className={`rounded-lg transition-colors mb-8 p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Manage your account information
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiEdit2 size={18} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div
          className={`rounded-lg transition-colors mb-8 p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    isEditing
                      ? theme === 'dark'
                        ? 'bg-slate-700 border border-slate-600'
                        : 'bg-white border border-gray-300'
                      : theme === 'dark'
                      ? 'bg-slate-700 border border-slate-600 opacity-50'
                      : 'bg-gray-100 border border-gray-300 opacity-50'
                  }`}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    isEditing
                      ? theme === 'dark'
                        ? 'bg-slate-700 border border-slate-600'
                        : 'bg-white border border-gray-300'
                      : theme === 'dark'
                      ? 'bg-slate-700 border border-slate-600 opacity-50'
                      : 'bg-gray-100 border border-gray-300 opacity-50'
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className={`w-full px-4 py-2 rounded-lg opacity-50 ${
                  theme === 'dark'
                    ? 'bg-slate-700 border border-slate-600'
                    : 'bg-gray-100 border border-gray-300'
                }`}
              />
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Email cannot be changed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    isEditing
                      ? theme === 'dark'
                        ? 'bg-slate-700 border border-slate-600'
                        : 'bg-white border border-gray-300'
                      : theme === 'dark'
                      ? 'bg-slate-700 border border-slate-600 opacity-50'
                      : 'bg-gray-100 border border-gray-300 opacity-50'
                  }`}
                />
              </div>

              {/* Company */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    isEditing
                      ? theme === 'dark'
                        ? 'bg-slate-700 border border-slate-600'
                        : 'bg-white border border-gray-300'
                      : theme === 'dark'
                      ? 'bg-slate-700 border border-slate-600 opacity-50'
                      : 'bg-gray-100 border border-gray-300 opacity-50'
                  }`}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <FiSave size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    company: user?.company || '',
                  });
                }}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 border-slate-600 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors"
              >
                <FiX size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Change Password Section */}
        <div
          className={`rounded-lg transition-colors p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Security</h2>
            {!showPasswordForm && (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiEdit2 size={18} />
                Change Password
              </button>
            )}
          </div>

          {showPasswordForm && (
            <div className="space-y-6">
              {/* Current Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-slate-700 border border-slate-600'
                      : 'bg-white border border-gray-300'
                  }`}
                />
              </div>

              {/* New Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-slate-700 border border-slate-600'
                      : 'bg-white border border-gray-300'
                  }`}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-slate-700 border border-slate-600'
                      : 'bg-white border border-gray-300'
                  }`}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleChangePassword}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  <FiSave size={18} />
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
                <button
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="flex items-center gap-2 px-6 py-2 border border-gray-300 border-slate-600 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors"
                >
                  <FiX size={18} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
