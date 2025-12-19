import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, FileText, CheckCircle, AlertCircle, TrendingUp, Users } from 'lucide-react';

const activityIcons = {
  project_created: FileText,
  project_completed: CheckCircle,
  project_updated: TrendingUp,
  team_joined: Users,
  alert: AlertCircle,
};

const activityColors = {
  project_created: 'bg-blue-100 bg-blue-900/30 text-blue-600 text-blue-400',
  project_completed: 'bg-green-100 bg-green-900/30 text-green-600 text-green-400',
  project_updated: 'bg-purple-100 bg-purple-900/30 text-purple-600 text-purple-400',
  team_joined: 'bg-orange-100 bg-orange-900/30 text-orange-600 text-orange-400',
  alert: 'bg-red-100 bg-red-900/30 text-red-600 text-red-400',
};

export default function RealtimeActivityFeed() {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'project_created',
      title: 'Mobile App Development project created',
      description: 'Started new project estimation',
      timestamp: new Date(Date.now() - 120000),
      read: false,
    },
    {
      id: 2,
      type: 'project_completed',
      title: 'Web Platform Redesign completed',
      description: 'Project finished on time',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: 3,
      type: 'team_joined',
      title: 'Sarah Johnson joined your team',
      description: 'New team member added',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Math.random(),
        type: Object.keys(activityIcons)[Math.floor(Math.random() * Object.keys(activityIcons).length)],
        title: `New activity at ${new Date().toLocaleTimeString()}`,
        description: 'Real-time update from your projects',
        timestamp: new Date(),
        read: false,
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 8000); // Add new activity every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id ? { ...activity, read: true } : activity
      )
    );
  };

  const formatTime = (date) => {
    const seconds = Math.floor((Date.now() - date) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white bg-gray-800 rounded-xl border-2 border-gray-200 border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-600 text-accent-400" />
          Real-time Activity
        </h3>
        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
          Live
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {activities.map((activity) => {
            const IconComponent = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => markAsRead(activity.id)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  activity.read
                    ? 'bg-gray-50 bg-gray-700/30'
                    : 'bg-gradient-to-r from-brand-50 to-accent-50 from-brand-900/20 to-accent-900/20 border-l-4 border-brand-600'
                } hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0 mt-1`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-900 text-white text-sm">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-600 text-gray-400 mt-1">
                          {activity.description}
                        </p>
                      </div>
                      {!activity.read && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-brand-600 bg-accent-400 rounded-full flex-shrink-0 mt-1"
                        />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 text-gray-500 mt-2">
                      {formatTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
