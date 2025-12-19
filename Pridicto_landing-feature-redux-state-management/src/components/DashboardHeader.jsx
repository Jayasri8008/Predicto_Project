import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import NotificationCenter from './NotificationCenter';
import { logoutUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 right-0 left-64 h-20 border-b transition-colors ${
        theme === 'dark'
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="h-full px-8 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
            Welcome, {user?.firstName || 'User'}! 👋
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {user?.email}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <NotificationCenter />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg hover:bg-gray-100 hover:bg-slate-700 transition-colors`}
          >
            <FiSettings size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg hover:bg-gray-100 hover:bg-slate-700 transition-colors`}
          >
            <FiUser size={20} />
          </motion.button>
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-red-600 hover:bg-red-50 hover:bg-red-900/20 transition-colors"
          >
            <FiLogOut size={20} />
          </motion.button>
        </motion.div>
      </div>
    </header>
  );
}
