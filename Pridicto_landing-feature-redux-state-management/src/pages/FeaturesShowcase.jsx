import React, { useState } from 'react';
import EmailVerification from '../components/Features/EmailVerification';
import PasswordReset from '../components/Features/PasswordReset';
import ProfilePictureUpload from '../components/Features/ProfilePictureUpload';
import SearchComponent from '../components/Features/SearchComponent';
import PDFExport from '../components/Features/PDFExport';
import ActivityTimeline from '../components/Features/ActivityTimeline';
import SocialSharing from '../components/Features/SocialSharing';
import KeyboardShortcuts from '../components/Features/KeyboardShortcuts';

export default function FeaturesShowcase() {
  const [activeTab, setActiveTab] = useState('email');

  const tabs = [
    { id: 'email', label: '📧 Email', component: EmailVerification },
    { id: 'password', label: '🔐 Password', component: PasswordReset },
    { id: 'profile', label: '📸 Profile', component: ProfilePictureUpload },
    { id: 'search', label: '🔍 Search', component: SearchComponent },
    { id: 'pdf', label: '📄 PDF', component: PDFExport },
    { id: 'activity', label: '📊 Activity', component: ActivityTimeline },
    { id: 'sharing', label: '🔗 Sharing', component: SocialSharing },
    { id: 'shortcuts', label: '⌨️ Shortcuts', component: KeyboardShortcuts },
  ];

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 from-gray-900 to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 text-white mb-2">
            🚀 8 Advanced Features
          </h1>
          <p className="text-gray-600 text-gray-300">
            Explore all the powerful features of Predicto.ai
          </p>
        </div>

        <div className="w-full mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white bg-gray-800 p-2 rounded-lg border border-gray-200 border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-md font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 bg-gray-700 text-gray-900 text-white hover:bg-gray-200 hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {ActiveComponent && <ActiveComponent />}
        </div>

        <div className="mt-12 bg-white bg-gray-800 rounded-lg p-6 border border-gray-200 border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">📋 Feature Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 bg-blue-900/20 rounded-lg border border-blue-200 border-blue-800">
              <h3 className="font-semibold text-blue-900 text-blue-200 mb-2">Email Verification</h3>
              <p className="text-sm text-blue-800 text-blue-300">Send & verify email addresses with 24-hour tokens</p>
            </div>
            <div className="p-4 bg-purple-50 bg-purple-900/20 rounded-lg border border-purple-200 border-purple-800">
              <h3 className="font-semibold text-purple-900 text-purple-200 mb-2">Password Reset</h3>
              <p className="text-sm text-purple-800 text-purple-300">Secure password reset with 1-hour tokens</p>
            </div>
            <div className="p-4 bg-amber-50 bg-amber-900/20 rounded-lg border border-amber-200 border-amber-800">
              <h3 className="font-semibold text-amber-900 text-amber-200 mb-2">Profile Picture</h3>
              <p className="text-sm text-amber-800 text-amber-300">Upload & manage profile pictures (5MB max)</p>
            </div>
            <div className="p-4 bg-cyan-50 bg-cyan-900/20 rounded-lg border border-cyan-200 border-cyan-800">
              <h3 className="font-semibold text-cyan-900 text-cyan-200 mb-2">Search</h3>
              <p className="text-sm text-cyan-800 text-cyan-300">Multi-type search for projects & users</p>
            </div>
            <div className="p-4 bg-red-50 bg-red-900/20 rounded-lg border border-red-200 border-red-800">
              <h3 className="font-semibold text-red-900 text-red-200 mb-2">PDF Export</h3>
              <p className="text-sm text-red-800 text-red-300">Export single or batch projects to PDF</p>
            </div>
            <div className="p-4 bg-green-50 bg-green-900/20 rounded-lg border border-green-200 border-green-800">
              <h3 className="font-semibold text-green-900 text-green-200 mb-2">Activity Timeline</h3>
              <p className="text-sm text-green-800 text-green-300">Track user activities with detailed logs</p>
            </div>
            <div className="p-4 bg-teal-50 bg-teal-900/20 rounded-lg border border-teal-200 border-teal-800">
              <h3 className="font-semibold text-teal-900 text-teal-200 mb-2">Social Sharing</h3>
              <p className="text-sm text-teal-800 text-teal-300">Create & track shareable links with analytics</p>
            </div>
            <div className="p-4 bg-indigo-50 bg-indigo-900/20 rounded-lg border border-indigo-200 border-indigo-800">
              <h3 className="font-semibold text-indigo-900 text-indigo-200 mb-2">Keyboard Shortcuts</h3>
              <p className="text-sm text-indigo-800 text-indigo-300">Customizable shortcuts for power users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
