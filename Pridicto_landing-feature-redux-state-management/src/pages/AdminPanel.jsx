import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function AdminPanel() {
  const [dark, setDark] = useState(false);
  const [estimations, setEstimations] = useState([]);
  const [stats, setStats] = useState({ total: 0, avgCost: 0, avgTime: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('predicto_theme');
    if (saved) setDark(saved === 'dark');
    // Mock data
    setEstimations([
      { id: 1, projectType: 'web', cost: 45000, time: 10, user: 'user1@example.com' },
      { id: 2, projectType: 'mobile', cost: 60000, time: 14, user: 'user2@example.com' },
      { id: 3, projectType: 'ai', cost: 80000, time: 20, user: 'user3@example.com' }
    ]);
    setStats({ total: 185000, avgCost: 61666, avgTime: 14.67 });
  }, []);

  const updateAI = () => {
    alert('AI logic update functionality would be implemented here.');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-slate-900 text-gray-100':'bg-white text-gray-800'}`}>
      <Navbar dark={dark} setDark={setDark} />
      <main className="pt-28 pb-16 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">Manage estimations and view statistics.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow text-center">
            <h3 className="text-2xl font-bold text-indigo-600">{estimations.length}</h3>
            <p className="text-gray-500">Total Estimations</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow text-center">
            <h3 className="text-2xl font-bold text-indigo-600">${stats.avgCost.toLocaleString()}</h3>
            <p className="text-gray-500">Avg Cost</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow text-center">
            <h3 className="text-2xl font-bold text-indigo-600">{stats.avgTime.toFixed(1)} weeks</h3>
            <p className="text-gray-500">Avg Time</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
          <h3 className="text-xl font-semibold mb-4">Usage Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={estimations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="projectType" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Estimations</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Cost</th>
                  <th className="p-2 text-left">Time</th>
                  <th className="p-2 text-left">User</th>
                </tr>
              </thead>
              <tbody>
                {estimations.map((est) => (
                  <tr key={est.id} className="border-b border-gray-200 dark:border-slate-700">
                    <td className="p-2">{est.id}</td>
                    <td className="p-2">{est.projectType}</td>
                    <td className="p-2">${est.cost.toLocaleString()}</td>
                    <td className="p-2">{est.time} weeks</td>
                    <td className="p-2">{est.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <button onClick={updateAI} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Update AI Logic Factors
          </button>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
