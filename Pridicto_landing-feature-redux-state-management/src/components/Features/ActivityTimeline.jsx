import React, { useState, useEffect } from 'react';
import { Activity, Loader, AlertCircle, Filter } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function ActivityTimeline() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const api = useApi();

  useEffect(() => {
    fetchActivities();
  }, [filter]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      let endpoint = '/activity';
      if (filter !== 'all') {
        endpoint = `/activity/action/${filter}`;
      }
      const response = await api.get(endpoint);
      setActivities(response.data.data || []);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action) => {
    const colors = {
      create: 'text-green-600 text-green-400 bg-green-100 bg-green-900/30',
      update: 'text-blue-600 text-blue-400 bg-blue-100 bg-blue-900/30',
      delete: 'text-red-600 text-red-400 bg-red-100 bg-red-900/30',
      login: 'text-purple-600 text-purple-400 bg-purple-100 bg-purple-900/30',
      logout: 'text-gray-600 text-gray-400 bg-gray-100 bg-gray-900/30',
    };
    return colors[action] || colors.update;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-green-600 text-green-400" />
        <h3 className="text-xl font-bold text-gray-900 text-white">Activity Timeline</h3>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-gray-600 text-gray-400" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white text-sm"
        >
          <option value="all">All Activities</option>
          <option value="create">Created</option>
          <option value="update">Updated</option>
          <option value="delete">Deleted</option>
          <option value="login">Login</option>
          <option value="logout">Logout</option>
        </select>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader className="w-6 h-6 animate-spin text-green-600 text-green-400" />
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-100 bg-red-900/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 text-red-400" />
          <span className="text-red-900 text-red-200">{message}</span>
        </div>
      )}

      {activities.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-600 text-gray-400">
          No activities found
        </div>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-3 bg-white bg-gray-800 rounded-lg border border-gray-200 border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getActionColor(activity.action)}`}>
                  {activity.action.toUpperCase()}
                </span>
                <p className="mt-2 text-sm text-gray-900 text-white font-medium">
                  {activity.description || `${activity.action} ${activity.entity}`}
                </p>
                {activity.metadata && (
                  <p className="text-xs text-gray-600 text-gray-400 mt-1">
                    {typeof activity.metadata === 'string'
                      ? activity.metadata
                      : JSON.stringify(activity.metadata)}
                  </p>
                )}
              </div>
              <div className="text-right text-xs text-gray-500 text-gray-500">
                {formatDate(activity.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
