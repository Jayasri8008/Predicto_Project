import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SuggestionBox from '../components/SuggestionBox';
import PersonalizedSuggestions from '../components/PersonalizedSuggestions';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const articles = [
  { id: 1, title: 'How to Build an Investor-Winning Pitch Deck', category: 'Pitch Deck', date: '2023-10-01' },
  { id: 2, title: 'Market Research 101: Steps Before Launching a Product', category: 'Market Research', date: '2023-09-15' },
  { id: 3, title: 'Financial Modelling for Startups — Simplified', category: 'Financial Modelling', date: '2023-08-20' },
];

export default function Insights(){
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100">
      <Navbar />
      <main className="pt-28 max-w-7xl mx-auto px-6 pb-16 space-y-12">
        <motion.section initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="text-center">
          <h1 className="text-4xl font-extrabold">Insights & <span className="text-indigo-600">Blog</span></h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">Latest articles on startup growth and business strategy.</p>
        </motion.section>

        <section className="grid md:grid-cols-3 gap-6">
          {articles.map(article => (
            <div key={article.id} className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
              <h3 className="font-semibold text-indigo-600">{article.title}</h3>
              <p className="text-sm text-gray-500 mt-2">Category: {article.category}</p>
              <p className="text-sm text-gray-400 mt-1">Published: {article.date}</p>
            </div>
          ))}
        </section>

        {/* AI-Powered Suggestions for Insights */}
        <motion.section 
          initial={{opacity:0,y:30}} 
          animate={{opacity:1,y:0}} 
          transition={{delay:0.3}}
          className="grid md:grid-cols-2 gap-8"
        >
          <PersonalizedSuggestions 
            userId={useSelector((state) => state.auth.user)?.id} 
            limit={3}
          />
          <SuggestionBox 
            context="insights" 
            maxSuggestions={3}
          />
        </motion.section>
      </main>
      <Footer/>
    </div>
  );
}
