import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from './DashboardLayout';
import { updatePreferences } from '../store/slices/authSlice';
import { toggleTheme } from '../store/slices/uiSlice';
import { FiSun, FiMoon, FiBell, FiLock, FiGlobe } from 'react-icons/fi';

export default function DashboardSettings() {
  const dispatch = useDispatch();
  const { preferences } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);
  const [settings, setSettings] = useState({
    theme: preferences.theme || 'light',
    notifications: {
      email: true,
      projectUpdates: true,
      billing: true,
      newsletter: false,
    },
    privacy: {
      profileVisibility: 'private',
      shareAnalytics: true,
    },
    language: preferences.language || 'en',
  });

  const handleThemeChange = (newTheme) => {
    setSettings((prev) => ({ ...prev, theme: newTheme }));
    dispatch(toggleTheme());
  };

  const handleNotificationChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handlePrivacyChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: typeof prev.privacy[key] === 'boolean' 
          ? !prev.privacy[key] 
          : prev.privacy[key],
      },
    }));
  };

  const handleSaveSettings = () => {
    dispatch(updatePreferences({
      theme: settings.theme,
      notifications: settings.notifications.email,
      language: settings.language,
    }));
    alert('Settings saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Customize your preferences and account settings
          </p>
        </div>

        {/* Theme Settings */}
        <div
          className={`rounded-lg transition-colors mb-8 p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FiSun size={20} />
            Appearance
          </h2>

          <div className="space-y-4">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose your preferred theme
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Light Theme */}
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  settings.theme === 'light'
                    ? 'border-indigo-600 bg-indigo-50 bg-indigo-900/30'
                    : theme === 'dark'
                    ? 'border-slate-600 hover:border-slate-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiSun size={24} className="mx-auto mb-2" />
                <p className="font-medium">Light</p>
              </button>

              {/* Dark Theme */}
              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  settings.theme === 'dark'
                    ? 'border-indigo-600 bg-indigo-50 bg-indigo-900/30'
                    : theme === 'dark'
                    ? 'border-slate-600 hover:border-slate-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiMoon size={24} className="mx-auto mb-2" />
                <p className="font-medium">Dark</p>
              </button>

              {/* Auto Theme */}
              <button
                onClick={() => handleThemeChange('auto')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  settings.theme === 'auto'
                    ? 'border-indigo-600 bg-indigo-50 bg-indigo-900/30'
                    : theme === 'dark'
                    ? 'border-slate-600 hover:border-slate-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-lg mx-auto mb-2">
                  <FiSun size={18} /> <span>/</span> <FiMoon size={18} />
                </div>
                <p className="font-medium">Auto</p>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div
          className={`rounded-lg transition-colors mb-8 p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FiBell size={20} />
            Notifications
          </h2>

          <div className="space-y-4">
            {/* Email Notifications */}
            <label className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors cursor-pointer">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Receive email notifications
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={() => handleNotificationChange('email')}
                className="w-5 h-5 rounded"
              />
            </label>

            {/* Project Updates */}
            <label className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors cursor-pointer">
              <div>
                <p className="font-medium">Project Updates</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Get notified about project changes
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.projectUpdates}
                onChange={() => handleNotificationChange('projectUpdates')}
                className="w-5 h-5 rounded"
              />
            </label>

            {/* Billing Notifications */}
            <label className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors cursor-pointer">
              <div>
                <p className="font-medium">Billing Alerts</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Receive billing and payment notifications
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.billing}
                onChange={() => handleNotificationChange('billing')}
                className="w-5 h-5 rounded"
              />
            </label>

            {/* Newsletter */}
            <label className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors cursor-pointer">
              <div>
                <p className="font-medium">Newsletter</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Subscribe to our newsletter
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.newsletter}
                onChange={() => handleNotificationChange('newsletter')}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>
        </div>

        {/* Privacy Settings */}
        <div
          className={`rounded-lg transition-colors mb-8 p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FiLock size={20} />
            Privacy
          </h2>

          <div className="space-y-4">
            {/* Profile Visibility */}
            <div className="p-4 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors">
              <p className="font-medium mb-2">Profile Visibility</p>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) =>
                  handlePrivacyChange('profileVisibility')
                }
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-700 border border-slate-600'
                    : 'bg-gray-100 border border-gray-300'
                }`}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>

            {/* Share Analytics */}
            <label className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors cursor-pointer">
              <div>
                <p className="font-medium">Share Anonymous Analytics</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Help us improve by sharing usage data
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.privacy.shareAnalytics}
                onChange={() => handlePrivacyChange('shareAnalytics')}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>
        </div>

        {/* Language Settings */}
        <div
          className={`rounded-lg transition-colors mb-8 p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FiGlobe size={20} />
            Language
          </h2>

          <select
            value={settings.language}
            onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
            className={`w-full px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-slate-700 border border-slate-600'
                : 'bg-gray-100 border border-gray-300'
            }`}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Save All Settings
        </button>
      </div>
    </DashboardLayout>
  );
}
