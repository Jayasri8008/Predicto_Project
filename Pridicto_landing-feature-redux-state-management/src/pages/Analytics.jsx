import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const sample = [
  {name:'Jan', v:40},{name:'Feb', v:60},{name:'Mar', v:75},{name:'Apr', v:90},{name:'May', v:70}
];

export default function Analytics(){
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100">
      <Navbar />
      <main className="pt-28 max-w-7xl mx-auto px-6 pb-16">
        <h1 className="text-2xl font-bold mb-4">Analytics</h1>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sample}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line dataKey="v" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
