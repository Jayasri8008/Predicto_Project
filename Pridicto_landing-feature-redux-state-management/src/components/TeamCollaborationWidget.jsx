import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, FileText, Award } from 'lucide-react';

export default function TeamCollaborationWidget() {
  const [teamActivity, setTeamActivity] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: '👩‍💼',
      action: 'commented on Mobile App project',
      time: new Date(Date.now() - 120000),
      actionType: 'comment',
    },
    {
      id: 2,
      name: 'Bob Smith',
      avatar: '👨‍💻',
      action: 'updated project timeline',
      time: new Date(Date.now() - 600000),
      actionType: 'update',
    },
    {
      id: 3,
      name: 'Carol Williams',
      avatar: '👩‍💻',
      action: 'completed task: API Integration',
      time: new Date(Date.now() - 1800000),
      actionType: 'complete',
    },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Alice Johnson', avatar: '👩‍💼', status: 'online', role: 'Lead' },
    { id: 2, name: 'Bob Smith', avatar: '👨‍💻', status: 'online', role: 'Developer' },
    { id: 3, name: 'Carol Williams', avatar: '👩‍💻', status: 'idle', role: 'Designer' },
    { id: 4, name: 'David Brown', avatar: '👨‍🔧', status: 'offline', role: 'QA' },
  ]);

  // Simulate real-time team activity
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        'commented on project',
        'updated documentation',
        'completed a task',
        'requested review',
        'assigned subtask',
        'resolved issue',
      ];

      const newActivity = {
        id: Math.random(),
        name: teamMembers[Math.floor(Math.random() * teamMembers.length)].name,
        avatar: teamMembers[Math.floor(Math.random() * teamMembers.length)].avatar,
        action: actions[Math.floor(Math.random() * actions.length)],
        time: new Date(),
        actionType: ['comment', 'update', 'complete'][Math.floor(Math.random() * 3)],
      };

      setTeamActivity(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 6000);

    return () => clearInterval(interval);
  }, [teamMembers]);

  // Simulate status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTeamMembers(prev =>
        prev.map(member => ({
          ...member,
          status: ['online', 'idle', 'offline'][Math.floor(Math.random() * 3)],
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const seconds = Math.floor((Date.now() - date) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'comment':
        return MessageSquare;
      case 'update':
        return FileText;
      case 'complete':
        return Award;
      default:
        return Users;
    }
  };

  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    offline: 'bg-gray-500',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Team Activity */}
      <div className="bg-white bg-gray-800 rounded-xl border-2 border-gray-200 border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 text-white mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-600 text-accent-400" />
          Team Activity
        </h3>

        <div className="space-y-3">
          {teamActivity.map((activity, index) => {
            const ActionIcon = getActionIcon(activity.actionType);

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 bg-gray-700/30 hover:bg-gray-100 hover:bg-gray-700 transition-colors"
              >
                <span className="text-lg flex-shrink-0">{activity.avatar}</span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 text-white">
                    {activity.name}
                  </p>
                  <p className="text-xs text-gray-600 text-gray-400 mt-1">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 text-gray-500 mt-2">
                    {formatTime(activity.time)}
                  </p>
                </div>

                <div className={`p-2 rounded ${
                  activity.actionType === 'comment'
                    ? 'bg-blue-100 bg-blue-900/30 text-blue-600 text-blue-400'
                    : activity.actionType === 'update'
                    ? 'bg-purple-100 bg-purple-900/30 text-purple-600 text-purple-400'
                    : 'bg-green-100 bg-green-900/30 text-green-600 text-green-400'
                }`}>
                  <ActionIcon className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Team Members Status */}
      <div className="bg-white bg-gray-800 rounded-xl border-2 border-gray-200 border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-600 text-accent-400" />
          Team Members
        </h3>

        <div className="space-y-2">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              layout
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 bg-gray-700/30 hover:bg-gray-100 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-lg">{member.avatar}</span>
                  <motion.div
                    animate={{ scale: member.status === 'online' ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white border-gray-800 ${statusColors[member.status]}`}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 text-white">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-600 text-gray-400">
                    {member.role}
                  </p>
                </div>
              </div>

              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs font-bold capitalize"
              >
                <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                  member.status === 'online'
                    ? 'bg-green-500'
                    : member.status === 'idle'
                    ? 'bg-yellow-500'
                    : 'bg-gray-500'
                }`}>
                  {member.status}
                </span>
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-gradient-to-r from-brand-50 to-accent-50 from-brand-900/20 to-accent-900/20 rounded-lg border border-brand-200 border-brand-800"
        >
          <p className="text-xs text-brand-700 text-brand-300 font-semibold">
            {teamMembers.filter(m => m.status === 'online').length} online • {teamMembers.length} total
          </p>
        </motion.div>
      </div>
    </div>
  );
}
