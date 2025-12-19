import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useSelector } from 'react-redux';

export default function DashboardLayout({ children }) {
  const { theme } = useSelector((state) => state.ui);

  return (
    <div className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} min-h-screen`}>
      <DashboardSidebar />
      <DashboardHeader />
      <main className="ml-64 mt-20 p-8">
        {children}
      </main>
    </div>
  );
}
