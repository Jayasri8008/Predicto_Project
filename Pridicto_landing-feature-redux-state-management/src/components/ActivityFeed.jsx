import React from 'react';
import { useSelector } from 'react-redux';
import { FiActivity, FiDownload, FiEye } from 'react-icons/fi';

export default function ActivityFeed({ activities = [] }) {
  const { theme } = useSelector((state) => state.ui);

  const defaultActivities = [
    {
      id: 1,
      type: 'estimate_created',
      description: 'Created new project estimate',
      timestamp: new Date(Date.now() - 3600000),
      details: 'Mobile App Development',
    },
    {
      id: 2,
      type: 'download',
      description: 'Downloaded project report',
      timestamp: new Date(Date.now() - 7200000),
      details: 'Web Platform Estimation',
    },
    {
      id: 3,
      type: 'estimate_updated',
      description: 'Updated project estimate',
      timestamp: new Date(Date.now() - 86400000),
      details: 'E-commerce Website',
    },
  ];

  const activityList = activities.length > 0 ? activities : defaultActivities;

  const activityIcons = {
    estimate_created: FiEye,
    download: FiDownload,
    estimate_updated: FiActivity,
  };

  return (
    <div
      className={`rounded-lg transition-colors ${
        theme === 'dark'
          ? 'bg-slate-800 border border-slate-700'
          : 'bg-white border border-gray-200'
      } p-6`}
    >
      <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {activityList.map((activity, index) => {
          const Icon = activityIcons[activity.type] || FiActivity;
          return (
            <div key={activity.id || index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 bg-indigo-900/30 text-indigo-600">
                  <Icon size={18} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">
                  {activity.description}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activity.details}
                </p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {activity.timestamp.toLocaleDateString()} at{' '}
                  {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {activityList.length === 0 && (
        <p className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No activities yet
        </p>
      )}
    </div>
  );
}
