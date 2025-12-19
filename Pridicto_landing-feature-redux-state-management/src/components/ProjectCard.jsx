import React from 'react';
import { useSelector } from 'react-redux';
import { FiDownload, FiTrash2, FiCopy, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const { theme } = useSelector((state) => state.ui);

  const statusColors = {
    completed: 'text-green-600 bg-green-100 bg-green-900/30',
    pending: 'text-yellow-600 bg-yellow-100 bg-yellow-900/30',
    in_progress: 'text-blue-600 bg-blue-100 bg-blue-900/30',
  };

  return (
    <div
      className={`p-6 rounded-lg transition-colors ${
        theme === 'dark'
          ? 'bg-slate-800 border border-slate-700 hover:border-indigo-500'
          : 'bg-white border border-gray-200 hover:border-indigo-500'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[project.status]}`}>
          {project.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-gray-200 border-slate-700">
        <div>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Cost</p>
          <p className="font-bold">${project.cost.toLocaleString()}</p>
        </div>
        <div>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Duration</p>
          <p className="font-bold">{project.duration} weeks</p>
        </div>
        <div>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Team</p>
          <p className="font-bold">{project.teamSize} people</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
          <FiEye size={16} />
          View
        </button>
        <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 border-slate-600 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors">
          <FiDownload size={16} />
        </button>
        <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 border-slate-600 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors">
          <FiCopy size={16} />
        </button>
        <button className="flex items-center justify-center gap-2 px-3 py-2 border border-red-300 border-red-600/30 text-red-600 rounded-lg hover:bg-red-50 hover:bg-red-900/20 transition-colors">
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}
