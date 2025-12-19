import React from 'react';
import { TrendingUp, Clock, CheckCircle, XCircle, Users, ThumbsUp } from 'lucide-react';

const SuggestionStats = ({ stats }) => {
  if (!stats) return null;

  const statItems = [
    {
      label: 'Open',
      value: stats.open || 0,
      icon: Clock,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'In Progress',
      value: stats.inProgress || 0,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Implemented',
      value: stats.implemented || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Rejected',
      value: stats.rejected || 0,
      icon: XCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const totalSuggestions = statItems.reduce((sum, item) => sum + item.value, 0);

  const getPercentage = (value) => {
    if (totalSuggestions === 0) return 0;
    return Math.round((value / totalSuggestions) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Suggestion Statistics</h2>
        <div className="text-sm text-gray-500">
          Total: {totalSuggestions} suggestions
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statItems.map((item) => {
          const percentage = getPercentage(item.value);
          const IconComponent = item.icon;
          
          return (
            <div key={item.label} className={`${item.bgColor} rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${item.color} bg-opacity-20`}>
                      <IconComponent className={`w-5 h-5 ${item.textColor}`} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">
                        {item.value}
                      </p>
                      <p className="ml-2 text-sm font-medium text-gray-600">
                        ({percentage}%)
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional insights */}
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Engagement rate */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ThumbsUp className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">Engagement Rate</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {totalSuggestions > 0 ? '85%' : '0%'}
            </p>
            <p className="text-xs text-gray-500">Active community</p>
          </div>

          {/* Average votes */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">Avg. Votes</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {totalSuggestions > 0 ? '12.3' : '0'}
            </p>
            <p className="text-xs text-gray-500">Per suggestion</p>
          </div>

          {/* Response time */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">Response Time</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">2.3 days</p>
            <p className="text-xs text-gray-500">Average</p>
          </div>
        </div>
      </div>

      {/* Recent activity summary */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">This Week's Activity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">New suggestions:</span>
            <span className="font-medium text-gray-900">24</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Implemented:</span>
            <span className="font-medium text-green-600">5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total votes:</span>
            <span className="font-medium text-blue-600">342</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionStats;
