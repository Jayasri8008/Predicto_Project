import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiHome,
  FiUser,
  FiFileText,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiChevronRight,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardSidebar() {
  const { theme } = useSelector((state) => state.ui);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: FiHome, label: 'Overview', path: '/dashboard' },
    { icon: FiUser, label: 'Profile', path: '/dashboard/profile' },
    { icon: FiFileText, label: 'Projects', path: '/dashboard/projects' },
    { icon: FiCreditCard, label: 'Billing', path: '/dashboard/billing' },
    { icon: FiSettings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed left-0 top-0 w-64 h-screen transition-colors ${
        theme === 'dark'
          ? 'bg-slate-800 border-r border-slate-700'
          : 'bg-white border-r border-gray-200'
      }`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-700 border-slate-700">
        <h2 className="text-2xl font-bold text-indigo-600">Predicto</h2>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Dashboard
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-slate-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              <FiChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'text-red-400 hover:bg-red-900/20'
              : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <FiLogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
