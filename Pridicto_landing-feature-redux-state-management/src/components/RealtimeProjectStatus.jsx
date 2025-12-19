import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Zap, Users, DollarSign } from 'lucide-react';

export default function RealtimeProjectStatus() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Mobile App Development',
      status: 'in_progress',
      progress: 65,
      estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      budget: 50000,
      spent: 32500,
      team: 5,
      lastUpdate: new Date(),
    },
    {
      id: 2,
      name: 'Web Platform Redesign',
      status: 'completed',
      progress: 100,
      estimatedCompletion: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      budget: 35000,
      spent: 34800,
      team: 4,
      lastUpdate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      name: 'E-commerce Website',
      status: 'at_risk',
      progress: 45,
      estimatedCompletion: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      budget: 25000,
      spent: 18750,
      team: 3,
      lastUpdate: new Date(),
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProjects(prev =>
        prev.map(project => ({
          ...project,
          progress: project.status === 'completed' ? 100 : Math.min(99, project.progress + Math.random() * 2),
          spent: Math.min(project.budget, project.spent + Math.random() * 500),
          lastUpdate: new Date(),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    completed: {
      icon: CheckCircle,
      color: 'bg-green-100 bg-green-900/30 text-green-600 text-green-400',
      label: 'Completed',
    },
    in_progress: {
      icon: Zap,
      color: 'bg-blue-100 bg-blue-900/30 text-blue-600 text-blue-400',
      label: 'In Progress',
    },
    at_risk: {
      icon: AlertCircle,
      color: 'bg-orange-100 bg-orange-900/30 text-orange-600 text-orange-400',
      label: 'At Risk',
    },
  };

  const getStatusConfig = (status) => statusConfig[status] || statusConfig.in_progress;

  const formatDaysLeft = (date) => {
    const days = Math.ceil((date - Date.now()) / (24 * 60 * 60 * 1000));
    return days > 0 ? `${days} days left` : 'Overdue';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 text-white">Active Projects</h3>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 text-xs font-semibold text-green-600 text-green-400"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          Real-time Sync
        </motion.div>
      </div>

      {projects.map((project, index) => {
        const StatusIcon = getStatusConfig(project.status).icon;
        const statusColor = getStatusConfig(project.status).color;
        const budgetRemaining = project.budget - project.spent;
        const budgetPercentage = (project.spent / project.budget) * 100;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white bg-gray-800 rounded-lg border-2 border-gray-200 border-gray-700 p-4 hover:border-brand-500 hover:border-accent-400 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded ${statusColor}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-white">
                    {project.name}
                  </h4>
                </div>
                <p className="text-xs text-gray-600 text-gray-400">
                  Last updated: {new Date(project.lastUpdate).toLocaleTimeString()}
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-right"
              >
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                  {getStatusConfig(project.status).label}
                </span>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-700 text-gray-300">
                  Progress
                </span>
                <span className="text-xs font-bold text-brand-600 text-accent-400">
                  {Math.round(project.progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-brand-600 to-accent-500 rounded-full"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {/* Days Left */}
              <div className="bg-gray-50 bg-gray-700/50 rounded p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600 text-blue-400" />
                  <span className="text-xs text-gray-600 text-gray-400">
                    Timeline
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 text-white">
                  {formatDaysLeft(project.estimatedCompletion)}
                </p>
              </div>

              {/* Team */}
              <div className="bg-gray-50 bg-gray-700/50 rounded p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-purple-600 text-purple-400" />
                  <span className="text-xs text-gray-600 text-gray-400">
                    Team
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 text-white">
                  {project.team} members
                </p>
              </div>

              {/* Budget Spent */}
              <div className="bg-gray-50 bg-gray-700/50 rounded p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3.5 h-3.5 text-green-600 text-green-400" />
                  <span className="text-xs text-gray-600 text-gray-400">
                    Spent
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 text-white">
                  ${(project.spent / 1000).toFixed(1)}K
                </p>
              </div>

              {/* Budget Remaining */}
              <div className="bg-gray-50 bg-gray-700/50 rounded p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3.5 h-3.5 text-orange-600 text-orange-400" />
                  <span className="text-xs text-gray-600 text-gray-400">
                    Remaining
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 text-white">
                  ${(budgetRemaining / 1000).toFixed(1)}K
                </p>
              </div>
            </div>

            {/* Budget Bar */}
            <div className="bg-gray-100 bg-gray-700/50 rounded p-2.5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-700 text-gray-300">
                  Budget Utilization
                </span>
                <span className="text-xs font-bold text-gray-900 text-white">
                  {Math.round(budgetPercentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-300 bg-gray-600 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  animate={{ width: `${budgetPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${
                    budgetPercentage > 90
                      ? 'bg-red-500'
                      : budgetPercentage > 70
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
