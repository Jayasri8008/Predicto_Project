import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from './DashboardLayout';
import ProjectCard from '../components/ProjectCard';
import { fetchUserProjects, updateFilter } from '../store/slices/dashboardSlice';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardProjects() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects, loading, error, filters } = useSelector((state) => state.dashboard);
  const { theme } = useSelector((state) => state.ui);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProjects());
    }
  }, [dispatch, user]);

  // Mock data for now
  const mockProjects = [
    {
      id: 1,
      name: 'Mobile App Development',
      status: 'in_progress',
      cost: 50000,
      duration: 12,
      teamSize: 5,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Web Platform Redesign',
      status: 'completed',
      cost: 35000,
      duration: 8,
      teamSize: 4,
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: 3,
      name: 'E-commerce Website',
      status: 'pending',
      cost: 25000,
      duration: 6,
      teamSize: 3,
      createdAt: new Date(Date.now() - 172800000),
    },
    {
      id: 4,
      name: 'SaaS Dashboard',
      status: 'completed',
      cost: 45000,
      duration: 10,
      teamSize: 4,
      createdAt: new Date(Date.now() - 259200000),
    },
    {
      id: 5,
      name: 'Mobile Game',
      status: 'in_progress',
      cost: 60000,
      duration: 16,
      teamSize: 6,
      createdAt: new Date(Date.now() - 345600000),
    },
  ];

  const displayProjects = projects.length > 0 ? projects : mockProjects;

  const filteredProjects = displayProjects
    .filter((p) => filters.status === 'all' || p.status === filters.status)
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'cost-high') return b.cost - a.cost;
      if (sortBy === 'cost-low') return a.cost - b.cost;
      return 0;
    });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Projects</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              View and manage all your estimates
            </p>
          </div>
          <Link
            to="/estimate"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <FiPlus size={20} />
            New Estimate
          </Link>
        </div>

        {loading && <LoadingSpinner size="lg" message="Loading projects..." />}

        {error && (
          <div className={`p-4 rounded-lg mb-6 ${
            theme === 'dark'
              ? 'bg-red-900/20 text-red-400'
              : 'bg-red-50 text-red-600'
          }`}>
            Error: {error}
          </div>
        )}

        {/* Filters */}
        <div
          className={`rounded-lg transition-colors mb-8 p-6 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-slate-700 border border-slate-600 placeholder-gray-500'
                      : 'bg-gray-100 border border-gray-300 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filters.status}
                onChange={(e) => dispatch(updateFilter({ status: e.target.value }))}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-700 border border-slate-600'
                    : 'bg-gray-100 border border-gray-300'
                }`}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-700 border border-slate-600'
                    : 'bg-gray-100 border border-gray-300'
                }`}
              >
                <option value="recent">Most Recent</option>
                <option value="cost-high">Cost: High to Low</option>
                <option value="cost-low">Cost: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div
            className={`rounded-lg transition-colors p-12 text-center ${
              theme === 'dark'
                ? 'bg-slate-800 border border-slate-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p className={`text-lg mb-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No projects found
            </p>
            <Link
              to="/estimate"
              className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FiPlus size={18} />
              Create Your First Estimate
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
