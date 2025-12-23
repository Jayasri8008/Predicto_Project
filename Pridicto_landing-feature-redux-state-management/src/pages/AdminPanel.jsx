import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiUsers,
  FiBarChart,
  FiSettings,
  FiMenu,
  FiX,
  FiTrendingUp,
  FiActivity,
  FiCheckCircle,
  FiTarget,
  FiUserCheck,
  FiEye,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiShield,
  FiDollarSign,
  FiServer,
  FiDatabase,
  FiZap,
  FiAlertTriangle,
  FiFileText,
  FiClock,
  FiBell,
  FiMail,
  FiCalendar,
  FiDownload,
  FiLock,
  FiKey
} from "react-icons/fi";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { useSelector } from 'react-redux';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: FiHome },
  { id: 'users', label: 'User Management', icon: FiUsers },
  { id: 'analytics', label: 'Project Analytics', icon: FiBarChart },
  { id: 'settings', label: 'Settings', icon: FiSettings }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // Mock data - in real implementation, this would come from APIs
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalUsers: 1250,
      activeUsers: 892,
      totalProjects: 345,
      activeProjects: 156,
      totalRevenue: 2450000,
      monthlyRevenue: 185000,
      systemHealth: 98.5,
      avgResponseTime: 245
    },
    users: {
      recentUsers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15', lastLogin: '2024-01-20' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active', joinDate: '2024-01-10', lastLogin: '2024-01-20' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', joinDate: '2024-01-05', lastLogin: '2024-01-18' }
      ],
      userStats: {
        total: 1250,
        active: 892,
        inactive: 358,
        admins: 12,
        moderators: 25
      }
    },
    analytics: {
      projectStats: [
        { month: 'Jan', projects: 45, revenue: 125000, accuracy: 92 },
        { month: 'Feb', projects: 52, revenue: 145000, accuracy: 94 },
        { month: 'Mar', projects: 48, revenue: 132000, accuracy: 91 },
        { month: 'Apr', projects: 61, revenue: 168000, accuracy: 96 },
        { month: 'May', projects: 55, revenue: 152000, accuracy: 93 },
        { month: 'Jun', projects: 67, revenue: 185000, accuracy: 95 }
      ],
      projectTypes: [
        { name: 'Web Development', value: 35, count: 121 },
        { name: 'Mobile Apps', value: 28, count: 97 },
        { name: 'AI/ML Projects', value: 20, count: 69 },
        { name: 'E-commerce', value: 12, count: 42 },
        { name: 'Other', value: 5, count: 16 }
      ]
    }
  });

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'indigo', suffix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${color}-100 dark:bg-${color}-900/20 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${
            change > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change > 0 ? <FiTrendingUp className="w-4 h-4" /> : <FiTrendingUp className="w-4 h-4 rotate-180" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </motion.div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={dashboardData.overview.totalUsers}
          change={12.5}
          icon={FiUsers}
          color="blue"
        />
        <StatCard
          title="Active Projects"
          value={dashboardData.overview.activeProjects}
          change={8.2}
          icon={FiTarget}
          color="green"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${dashboardData.overview.monthlyRevenue.toLocaleString()}`}
          change={15.3}
          icon={FiTrendingUp}
          color="purple"
        />
        <StatCard
          title="System Health"
          value={dashboardData.overview.systemHealth}
          suffix="%"
          icon={FiActivity}
          color="emerald"
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Project Types Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dashboardData.analytics.projectTypes}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {dashboardData.analytics.projectTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Users" value={dashboardData.users.userStats.total} icon={FiUsers} color="blue" />
        <StatCard title="Active Users" value={dashboardData.users.userStats.active} icon={FiUserCheck} color="green" />
        <StatCard title="Inactive Users" value={dashboardData.users.userStats.inactive} icon={FiUsers} color="gray" />
        <StatCard title="Admins" value={dashboardData.users.userStats.admins} icon={FiShield} color="red" />
        <StatCard title="Moderators" value={dashboardData.users.userStats.moderators} icon={FiShield} color="orange" />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Management</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
              <FiSearch className="w-4 h-4" />
              Search
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
              <FiFilter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="p-4 text-left text-gray-900 dark:text-white">Name</th>
                <th className="p-4 text-left text-gray-900 dark:text-white">Email</th>
                <th className="p-4 text-left text-gray-900 dark:text-white">Role</th>
                <th className="p-4 text-left text-gray-900 dark:text-white">Status</th>
                <th className="p-4 text-left text-gray-900 dark:text-white">Join Date</th>
                <th className="p-4 text-left text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.users.recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 dark:border-slate-700">
                  <td className="p-4 text-gray-900 dark:text-white">{user.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.role === 'admin' ? 'text-red-700 bg-red-100 dark:bg-red-900/20' :
                      user.role === 'moderator' ? 'text-orange-700 bg-orange-100 dark:bg-orange-900/20' :
                      'text-blue-700 bg-blue-100 dark:bg-blue-900/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status === 'active' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                      'text-red-700 bg-red-100 dark:bg-red-900/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{user.joinDate}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded">
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Projects" value={dashboardData.overview.totalProjects} icon={FiTarget} color="blue" />
        <StatCard title="Avg Accuracy" value="94%" icon={FiCheckCircle} color="green" />
        <StatCard title="Revenue Growth" value="15.3%" change={15.3} icon={FiTrendingUp} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Project Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.analytics.projectStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
              />
              <Line type="monotone" dataKey="projects" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Estimation Accuracy</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.analytics.projectStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
              />
              <Bar dataKey="accuracy" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="CPU Usage" value={dashboardData.monitoring.systemMetrics.cpu} suffix="%" icon={FiServer} color="blue" />
        <StatCard title="Memory Usage" value={dashboardData.monitoring.systemMetrics.memory} suffix="%" icon={FiDatabase} color="green" />
        <StatCard title="Disk Usage" value={dashboardData.monitoring.systemMetrics.disk} suffix="%" icon={FiDatabase} color="orange" />
        <StatCard title="Response Time" value={dashboardData.overview.avgResponseTime} suffix="ms" icon={FiZap} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">System Alerts</h3>
          <div className="space-y-4">
            {dashboardData.monitoring.alerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <FiAlertTriangle className={`w-5 h-5 ${
                  alert.severity === 'high' ? 'text-red-500' :
                  alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{alert.message}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{alert.timestamp}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  alert.severity === 'high' ? 'text-red-700 bg-red-100 dark:bg-red-900/20' :
                  alert.severity === 'medium' ? 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20' :
                  'text-blue-700 bg-blue-100 dark:bg-blue-900/20'
                }`}>
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {dashboardData.monitoring.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{activity.type.replace('_', ' ').toUpperCase()}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{activity.user} • {activity.ip}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAI = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Model Accuracy" value={`${dashboardData.ai.modelPerformance.accuracy}%`} icon={FiTarget} color="green" />
        <StatCard title="Precision" value={`${dashboardData.ai.modelPerformance.precision}%`} icon={FiCheckCircle} color="blue" />
        <StatCard title="Recall" value={`${dashboardData.ai.modelPerformance.recall}%`} icon={FiActivity} color="purple" />
        <StatCard title="F1 Score" value={`${dashboardData.ai.modelPerformance.f1Score}%`} icon={FiTrendingUp} color="orange" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Training Data Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Samples</span>
              <span className="font-semibold text-gray-900 dark:text-white">{dashboardData.ai.trainingData.totalSamples.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Training Set</span>
              <span className="font-semibold text-gray-900 dark:text-white">{dashboardData.ai.trainingData.trainingSamples.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Validation Set</span>
              <span className="font-semibold text-gray-900 dark:text-white">{dashboardData.ai.trainingData.validationSamples.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Test Set</span>
              <span className="font-semibold text-gray-900 dark:text-white">{dashboardData.ai.trainingData.testSamples.toLocaleString()}</span>
            </div>
          </div>
          <button className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Retrain Model
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Predictions</h3>
          <div className="space-y-4">
            {dashboardData.ai.recentPredictions.map((prediction) => (
              <div key={prediction.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white capitalize">{prediction.projectType} Project</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    prediction.accuracy >= 95 ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                    prediction.accuracy >= 90 ? 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20' :
                    'text-red-700 bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {prediction.accuracy}% accurate
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Predicted: </span>
                    <span className="font-medium text-gray-900 dark:text-white">${prediction.predictedCost.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Actual: </span>
                    <span className="font-medium text-gray-900 dark:text-white">${prediction.actualCost.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{prediction.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinance = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value={`$${dashboardData.overview.totalRevenue.toLocaleString()}`} change={18.2} icon={FiDollarSign} color="green" />
        <StatCard title="Monthly Profit" value={`$${dashboardData.finance.revenueData[dashboardData.finance.revenueData.length - 1].profit.toLocaleString()}`} change={22.1} icon={FiTrendingUp} color="blue" />
        <StatCard title="Active Subscriptions" value={Object.values(dashboardData.finance.subscriptions).reduce((a, b) => a + b, 0)} icon={FiUsers} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Revenue Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.finance.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
              />
              <Bar dataKey="revenue" fill="#10b981" />
              <Bar dataKey="profit" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Subscription Distribution</h3>
          <div className="space-y-4">
            {Object.entries(dashboardData.finance.subscriptions).map(([plan, count]) => (
              <div key={plan} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    plan === 'enterprise' ? 'bg-purple-500' :
                    plan === 'pro' ? 'bg-blue-500' :
                    plan === 'basic' ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                  <span className="capitalize text-gray-900 dark:text-white">{plan}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{count} users</span>
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(count / Object.values(dashboardData.finance.subscriptions).reduce((a, b) => a + b, 0)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Generate Report
            </button>
            <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Suggestions" value={dashboardData.content.suggestions.length} icon={FiFileText} color="blue" />
        <StatCard title="Pending Reviews" value={dashboardData.content.suggestions.filter(s => s.status === 'pending').length} icon={FiClock} color="orange" />
        <StatCard title="Approved Testimonials" value={dashboardData.content.testimonials.filter(t => t.status === 'approved').length} icon={FiCheckCircle} color="green" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Suggestion Management</h3>
          <div className="space-y-4">
            {dashboardData.content.suggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{suggestion.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    suggestion.status === 'approved' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                    suggestion.status === 'pending' ? 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20' :
                    'text-blue-700 bg-blue-100 dark:bg-blue-900/20'
                  }`}>
                    {suggestion.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">By {suggestion.author}</span>
                  <span className="text-gray-600 dark:text-gray-400">{suggestion.votes} votes</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{suggestion.createdAt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Testimonial Management</h3>
          <div className="space-y-4">
            {dashboardData.content.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    testimonial.status === 'approved' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                    'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20'
                  }`}>
                    {testimonial.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>{testimonial.company}</span>
                  <span>•</span>
                  <span>{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.submittedAt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Notifications" value={dashboardData.notifications.notificationStats.total} icon={FiBell} color="blue" />
        <StatCard title="Unread" value={dashboardData.notifications.notificationStats.unread} icon={FiMail} color="red" />
        <StatCard title="Today" value={dashboardData.notifications.notificationStats.today} icon={FiCalendar} color="green" />
        <StatCard title="This Week" value={dashboardData.notifications.notificationStats.thisWeek} icon={FiTrendingUp} color="purple" />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Notifications</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
              <FiFilter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
              <FiCheckCircle className="w-4 h-4" />
              Mark All Read
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {dashboardData.notifications.recentNotifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-4 p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
              <div className={`w-3 h-3 rounded-full mt-2 ${
                notification.priority === 'high' ? 'bg-red-500' :
                notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      notification.priority === 'high' ? 'text-red-700 bg-red-100 dark:bg-red-900/20' :
                      notification.priority === 'medium' ? 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20' :
                      'text-blue-700 bg-blue-100 dark:bg-blue-900/20'
                    }`}>
                      {notification.priority}
                    </span>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{notification.timestamp}</span>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <button className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 text-sm">
                        Mark Read
                      </button>
                    )}
                    <button className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded px-2 py-1 text-sm">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Active Sessions" value={dashboardData.security.securityMetrics.activeSessions} icon={FiShield} color="green" />
        <StatCard title="Failed Logins" value={dashboardData.security.securityMetrics.failedLogins} icon={FiAlertTriangle} color="red" />
        <StatCard title="Blocked IPs" value={dashboardData.security.securityMetrics.blockedIPs} icon={FiLock} color="orange" />
        <StatCard title="2FA Enabled" value={`${dashboardData.security.securityMetrics.twoFactorEnabled}%`} icon={FiKey} color="blue" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Security Events</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {dashboardData.security.securityEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  event.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{event.type.replace('_', ' ').toUpperCase()}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{event.user} • {event.ip} • {event.location}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{event.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Password Policy</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 rounded text-sm capitalize">
                {dashboardData.security.securitySettings.passwordPolicy}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Session Timeout</span>
              <span className="text-gray-900 dark:text-white">{dashboardData.security.securitySettings.sessionTimeout} min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Max Login Attempts</span>
              <span className="text-gray-900 dark:text-white">{dashboardData.security.securitySettings.maxLoginAttempts}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">IP Whitelist</span>
              <span className={`px-2 py-1 rounded text-sm ${
                dashboardData.security.securitySettings.ipWhitelist
                  ? 'text-green-700 bg-green-100 dark:bg-green-900/20'
                  : 'text-red-700 bg-red-100 dark:bg-red-900/20'
              }`}>
                {dashboardData.security.securitySettings.ipWhitelist ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
          <button className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Update Security Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Available Reports" value={dashboardData.reports.availableReports.length} icon={FiFileText} color="blue" />
        <StatCard title="Scheduled Reports" value={dashboardData.reports.scheduledReports.length} icon={FiCalendar} color="green" />
        <StatCard title="Total Downloads" value={dashboardData.reports.availableReports.reduce((sum, report) => sum + report.downloads, 0)} icon={FiDownload} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Available Reports</h3>
          <div className="space-y-4">
            {dashboardData.reports.availableReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{report.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    report.type === 'activity' ? 'text-blue-700 bg-blue-100 dark:bg-blue-900/20' :
                    report.type === 'finance' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                    report.type === 'performance' ? 'text-purple-700 bg-purple-100 dark:bg-purple-900/20' :
                    'text-red-700 bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {report.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Last Generated: {report.lastGenerated}</span>
                  <span className="text-gray-600 dark:text-gray-400">{report.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{report.downloads} downloads</span>
                  <button className="flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                    <FiDownload className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Scheduled Reports</h3>
          <div className="space-y-4">
            {dashboardData.reports.scheduledReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{report.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    report.frequency === 'daily' ? 'text-blue-700 bg-blue-100 dark:bg-blue-900/20' :
                    report.frequency === 'weekly' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                    'text-purple-700 bg-purple-100 dark:bg-purple-900/20'
                  }`}>
                    {report.frequency}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Next Run: {report.nextRun}</span>
                  <span className="text-gray-600 dark:text-gray-400">{report.recipients} recipients</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Schedule New Report
          </button>
        </div>
      </div>
    </div>
  );

  const renderApi = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Requests" value={dashboardData.api.apiMetrics.totalRequests.toLocaleString()} icon={FiActivity} color="blue" />
        <StatCard title="Avg Response Time" value={`${dashboardData.api.apiMetrics.avgResponseTime}ms`} icon={FiZap} color="green" />
        <StatCard title="Error Rate" value={`${dashboardData.api.apiMetrics.errorRate}%`} icon={FiAlertTriangle} color="red" />
        <StatCard title="Uptime" value={`${dashboardData.api.apiMetrics.uptime}%`} icon={FiCheckCircle} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">API Endpoints</h3>
          <div className="space-y-4">
            {dashboardData.api.apiEndpoints.map((endpoint) => (
              <div key={endpoint.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      endpoint.method === 'GET' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                      endpoint.method === 'POST' ? 'text-blue-700 bg-blue-100 dark:bg-blue-900/20' :
                      'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-gray-900 dark:text-white font-mono">{endpoint.path}</code>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    endpoint.status === 'active' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                    'text-red-700 bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {endpoint.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Calls: </span>
                    <span className="font-medium text-gray-900 dark:text-white">{endpoint.calls.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Avg Time: </span>
                    <span className="font-medium text-gray-900 dark:text-white">{endpoint.avgResponseTime}ms</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Called: </span>
                    <span className="font-medium text-gray-900 dark:text-white">{endpoint.lastCalled}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">API Keys</h3>
          <div className="space-y-4">
            {dashboardData.api.apiKeys.map((key) => (
              <div key={key.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{key.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    key.status === 'active' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                    'text-red-700 bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {key.status}
                  </span>
                </div>
                <div className="mb-2">
                  <code className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                    {key.key}
                  </code>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Created: {key.created}</span>
                  <span className="text-gray-600 dark:text-gray-400">Last Used: {key.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Generate New API Key
          </button>
        </div>
      </div>
    </div>
  );

  const renderAudit = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Events" value={dashboardData.audit.auditStats.totalEvents.toLocaleString()} icon={FiFileText} color="blue" />
        <StatCard title="Today Events" value={dashboardData.audit.auditStats.todayEvents} icon={FiCalendar} color="green" />
        <StatCard title="Critical Events" value={dashboardData.audit.auditStats.criticalEvents} icon={FiAlertTriangle} color="red" />
        <StatCard title="User Actions" value={dashboardData.audit.auditStats.userActions.toLocaleString()} icon={FiUsers} color="purple" />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Audit Logs</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
              <FiSearch className="w-4 h-4" />
              Search
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
              <FiFilter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
              <FiDownload className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {dashboardData.audit.auditLogs.map((log) => (
            <div key={log.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">{log.action.replace('_', ' ').toUpperCase()}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    log.status === 'success' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' :
                    'text-red-700 bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {log.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>User: {log.user}</span>
                  <span>Resource: {log.resource}</span>
                  <span>IP: {log.ip}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">System Settings</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maintenance Mode
              </label>
              <div className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 dark:border-slate-600" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Enable maintenance mode</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Notifications
              </label>
              <div className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-slate-600" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Send system alerts via email</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Rate Limit
              </label>
              <input
                type="number"
                defaultValue="1000"
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                defaultValue="60"
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Save Settings
          </button>
          <button className="px-6 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return renderUsers();
      case 'analytics':
        return renderAnalytics();
      case 'monitoring':
        return renderMonitoring();
      case 'ai':
        return renderAI();
      case 'finance':
        return renderFinance();
      case 'content':
        return renderContent();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Header */}
          <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <FiMenu className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Admin Panel'}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={refreshData}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{user?.name || 'Admin'}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderActiveTab()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}