import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileHeader({ user, stats = {} }) {
  const initials = (user?.name || user?.email || 'U').split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();

  return (
    <header className="w-full">
      <div className="bg-gradient-to-r from-brand-600 to-accent-500 h-44 rounded-b-3xl relative"></div>

      <div className="max-w-6xl mx-auto px-6 -mt-12">
        <div className="card border-0 shadow-lg p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 rounded-full bg-brand-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
              {initials}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 text-white">{user?.name || user?.email}</h1>
            <p className="text-lg text-brand-600 text-brand-400 font-medium mt-1">{user?.role || 'Product Designer'}</p>
            <p className="mt-3 text-gray-600 text-gray-300 max-w-2xl leading-relaxed">{user?.bio || 'Experienced product designer and frontend developer who builds delightful user experiences and robust interfaces. Passionate about accessible design, performance, and crafting well-tested UIs.'}</p>

            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <Link to="/dashboard/profile" className="btn-primary">View Dashboard</Link>
              <a href={`mailto:${user?.email}`} className="btn-secondary">Contact</a>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-center gap-3 text-center">
            <div>
              <div className="text-2xl font-bold text-brand-600 text-brand-400">{stats.projects ?? 0}</div>
              <div className="text-xs font-medium text-gray-500 text-gray-400">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-600 text-brand-400">{stats.followers ?? 0}</div>
              <div className="text-xs font-medium text-gray-500 text-gray-400">Followers</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
