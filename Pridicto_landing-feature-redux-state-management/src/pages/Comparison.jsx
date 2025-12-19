import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Comparison() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('predicto_theme');
    if (saved) setDark(saved === 'dark');
  }, []);

  const comparisonData = [
    { tool: 'Predicto.ai', accuracy: 95, speed: 5, cost: 0 },
    { tool: 'CostGPT', accuracy: 85, speed: 10, cost: 50 },
    { tool: 'BuildMyApp.ai', accuracy: 80, speed: 15, cost: 100 },
    { tool: 'EstiMate AI', accuracy: 90, speed: 8, cost: 75 }
  ];

  const poolData = [
    { name: 'Predicto.ai', value: 40 },
    { name: 'CostGPT', value: 25 },
    { name: 'BuildMyApp.ai', value: 20 },
    { name: 'EstiMate AI', value: 15 }
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-slate-900 text-gray-100':'bg-white text-gray-800'}`}>
      <Navbar dark={dark} setDark={setDark} />
      <main className="pt-28 pb-16 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Predicto.ai vs Competitors</h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">See how we stack up against the competition.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="p-4 text-left">Tool</th>
                <th className="p-4 text-center">Accuracy (%)</th>
                <th className="p-4 text-center">Speed (min)</th>
                <th className="p-4 text-center">Cost ($/month)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} className={`border-b border-gray-200 dark:border-slate-700 ${item.tool === 'Predicto.ai' ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                  <td className="p-4 font-semibold">{item.tool}</td>
                  <td className="p-4 text-center">{item.accuracy}%</td>
                  <td className="p-4 text-center">{item.speed}</td>
                  <td className="p-4 text-center">{item.cost === 0 ? 'Free' : `$${item.cost}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">Market Share (Pool Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={poolData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {poolData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Predicto.ai?</h2>
          <ul className="text-left max-w-2xl mx-auto space-y-2">
            <li>• Highest accuracy with AI-powered algorithms</li>
            <li>• Fastest estimation time</li>
            <li>• Completely free to use</li>
            <li>• Supports multiple project types</li>
            <li>• Detailed breakdowns and projections</li>
          </ul>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
