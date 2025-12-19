import React from 'react';
import { useSelector } from 'react-redux';

export default function DashboardStatsCard({ icon: Icon, label, value, color = 'indigo' }) {
  const { theme } = useSelector((state) => state.ui);

  const colorClasses = {
    indigo: 'text-indigo-600 bg-indigo-50 bg-indigo-900/20',
    green: 'text-green-600 bg-green-50 bg-green-900/20',
    blue: 'text-blue-600 bg-blue-50 bg-blue-900/20',
    purple: 'text-purple-600 bg-purple-50 bg-purple-900/20',
  };

  return (
    <div
      className={`p-6 rounded-lg transition-colors ${
        theme === 'dark'
          ? 'bg-slate-800 border border-slate-700'
          : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {label}
          </p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
