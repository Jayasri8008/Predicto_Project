import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { 
  FiDollarSign, 
  FiClock, 
  FiUsers, 
  FiTrendingUp, 
  FiTarget,
  FiActivity,
  FiCalendar,
  FiBarChart,
  FiPieChart,
  FiArrowUpRight,
  FiArrowDownRight,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function DashboardOverview() {
  const [dark, setDark] = useState(false);
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Simulate loading dashboard data
    const mockStats = {
      totalProjects: 12,
      activeProjects: 5,
      completedProjects: 7,
      totalRevenue: 245000,
      monthlyRevenue: 32500,
      activeUsers: 156,
      avgProjectCost: 20417,
      projectGrowth: 15.8,
      revenueGrowth: 23.4,
      timelineAccuracy: 89,
      budgetAccuracy: 94
    };
    setStats(mockStats);
  }, []);

  const recentProjects = [
    { id: 1, name: 'E-commerce Platform', status: 'Active', progress: 75, cost: 45000, deadline: '2024-02-15' },
    { id: 2, name: 'Mobile App Development', status: 'Review', progress: 90, cost: 28000, deadline: '2024-01-30' },
    { id: 3, name: 'CRM System', status: 'Planning', progress: 25, cost: 52000, deadline: '2024-03-20' },
    { id: 4, name: 'Construction Management', status: 'Active', progress: 60, cost: 78000, deadline: '2024-04-10' }
  ];

  const upcomingMilestones = [
    { project: 'E-commerce Platform', milestone: 'Frontend Complete', date: '2024-01-25', priority: 'High' },
    { project: 'Mobile App Development', milestone: 'App Store Submission', date: '2024-01-28', priority: 'Medium' },
    { project: 'CRM System', milestone: 'Requirements Finalization', date: '2024-02-02', priority: 'High' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100 bg-green-900/20';
      case 'Review': return 'text-yellow-600 bg-yellow-100 bg-yellow-900/20';
      case 'Planning': return 'text-blue-600 bg-blue-100 bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-100 bg-gray-900/20';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'indigo' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white/80 bg-slate-800/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200/50 border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${color}-100 bg-${color}-900/20 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${
            change > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change > 0 ? <FiArrowUpRight className="w-4 h-4" /> : <FiArrowDownRight className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 text-white mb-1">{value}</div>
      <div className="text-sm text-gray-600 text-gray-400">{title}</div>
    </motion.div>
  );

  return (
    <Layout dark={false} setDark={() => {}}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 from-slate-900 via-slate-800 to-slate-900">
        <div className="pt-28 pb-16 max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 text-white mb-2">
                  Welcome back, {user?.email?.split('@')[0] || 'User'}! 👋
                </h1>
                <p className="text-gray-600 text-gray-300">
                  Here's what's happening with your projects today.
                </p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <FiPlus className="w-4 h-4" />
                  New Project
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 border-gray-600 text-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:bg-slate-700 transition-colors">
                  <FiCalendar className="w-4 h-4" />
                  Schedule
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              <StatCard
                title="Total Projects"
                value={stats.totalProjects}
                change={stats.projectGrowth}
                icon={FiTarget}
                color="indigo"
              />
              <StatCard
                title="Monthly Revenue"
                value={`$${stats.monthlyRevenue.toLocaleString()}`}
                change={stats.revenueGrowth}
                icon={FiDollarSign}
                color="green"
              />
              <StatCard
                title="Active Users"
                value={stats.activeUsers}
                icon={FiUsers}
                color="blue"
              />
              <StatCard
                title="Timeline Accuracy"
                value={`${stats.timelineAccuracy}%`}
                icon={FiClock}
                color="purple"
              />
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white/80 bg-slate-800/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-200/50 border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 text-white flex items-center gap-3">
                  <FiActivity className="w-6 h-6 text-indigo-600" />
                  Recent Projects
                </h2>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 border border-gray-200 border-gray-600 rounded-lg hover:bg-gray-50 hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-white">{project.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600 text-gray-400">
                        ${project.cost.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600 text-gray-400">
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 text-white">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Milestones */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 bg-slate-800/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-200/50 border-slate-700/50"
            >
              <h2 className="text-xl font-bold text-gray-900 text-white mb-6 flex items-center gap-3">
                <FiCalendar className="w-6 h-6 text-indigo-600" />
                Upcoming Milestones
              </h2>

              <div className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="p-4 border border-gray-200 border-gray-600 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-2 h-2 rounded-full ${
                        milestone.priority === 'High' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        milestone.priority === 'High' 
                          ? 'text-red-700 bg-red-100 bg-red-900/20' 
                          : 'text-yellow-700 bg-yellow-100 bg-yellow-900/20'
                      }`}>
                        {milestone.priority}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-white mb-1">
                      {milestone.milestone}
                    </h3>
                    <p className="text-sm text-gray-600 text-gray-400 mb-2">
                      {milestone.project}
                    </p>
                    <p className="text-sm text-indigo-600 font-medium">
                      {new Date(milestone.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white/80 bg-slate-800/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-200/50 border-slate-700/50"
          >
            <h2 className="text-xl font-bold text-gray-900 text-white mb-6 flex items-center gap-3">
              <FiTrendingUp className="w-6 h-6 text-indigo-600" />
              Performance Overview
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 from-green-900/20 to-emerald-900/20 rounded-xl">
                <FiCheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-700 text-green-400">94%</div>
                <div className="text-sm text-green-600 text-green-300">Budget Accuracy</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 from-blue-900/20 to-indigo-900/20 rounded-xl">
                <FiTarget className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-700 text-blue-400">89%</div>
                <div className="text-sm text-blue-600 text-blue-300">Timeline Accuracy</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 from-purple-900/20 to-violet-900/20 rounded-xl">
                <FiUsers className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-700 text-purple-400">156</div>
                <div className="text-sm text-purple-600 text-purple-300">Active Team Members</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
