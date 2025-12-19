import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VerticalNavbar from './VerticalNavbar';
import Footer from './Footer';
import LoadingSpinner from './LoadingSpinner';

export default function Layout({ children, dark, setDark }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <LoadingSpinner size="lg" message="Loading your experience..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <VerticalNavbar
        dark={dark}
        setDark={setDark}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`pt-20 pb-8 transition-all duration-500 ease-in-out ${
          isCollapsed ? 'ml-16' : 'ml-64'
        } min-h-screen`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
