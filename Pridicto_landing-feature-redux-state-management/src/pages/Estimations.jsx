import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Estimations(){
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100">
      <Navbar />
      <main className="pt-28 max-w-7xl mx-auto px-6 pb-16">
        <h1 className="text-2xl font-bold mb-4">Estimations</h1>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
          <p className="text-gray-500">This page will list saved estimations, allow creation and editing. (Sample template)</p>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
