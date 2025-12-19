import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronUp, 
  FiHome, 
  FiArrowRight, 
  FiBookOpen,
  FiHelpCircle,
  FiStar
} from 'react-icons/fi';

export default function NavigationEnhancements() {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showQuickNav, setShowQuickNav] = useState(false);

  // Handle scroll-based UI states
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowScrollTop(scrollTop > 500);
      
      // Show quick nav when scrolling on long pages
      setShowQuickNav(scrollTop > 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close quick nav when route changes
  useEffect(() => {
    setShowQuickNav(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickNavItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/services', label: 'Services', icon: FiBookOpen },
    { path: '/about', label: 'About', icon: FiStar },
    { path: '/contact', label: 'Contact', icon: FiHelpCircle }
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <FiChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick Navigation */}
      <AnimatePresence>
        {showQuickNav && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40"
          >
            <div className="bg-white/80 bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl border border-gray-200/50 border-slate-700/50 p-2">
              <div className="text-center mb-2">
                <span className="text-xs font-medium text-gray-600 text-gray-400">Quick Nav</span>
              </div>
              <div className="space-y-1">
                {quickNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-indigo-500 text-white shadow-md'
                          : 'text-gray-600 text-gray-400 hover:bg-gray-100 hover:bg-slate-700'
                      }`}
                      title={item.label}
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route Progress Indicator */}
      <RouteProgressIndicator />

      {/* Keyboard Shortcuts Helper */}
      <KeyboardShortcutsHelper />
    </>
  );
}

// Route Progress Indicator Component
function RouteProgressIndicator() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalHeight) * 100;
      setProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 bg-slate-700 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

// Keyboard Shortcuts Helper
function KeyboardShortcutsHelper() {
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setShowShortcuts(true);
      } else if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!showShortcuts) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowShortcuts(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 text-white mb-4">
          Keyboard Shortcuts
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-gray-400">Open Search</span>
            <kbd className="px-2 py-1 bg-gray-100 bg-slate-700 rounded text-sm">Ctrl + K</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-gray-400">Close Modal</span>
            <kbd className="px-2 py-1 bg-gray-100 bg-slate-700 rounded text-sm">Esc</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-gray-400">Navigate Down</span>
            <kbd className="px-2 py-1 bg-gray-100 bg-slate-700 rounded text-sm">↓</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-gray-400">Navigate Up</span>
            <kbd className="px-2 py-1 bg-gray-100 bg-slate-700 rounded text-sm">↑</kbd>
          </div>
        </div>

        <button
          onClick={() => setShowShortcuts(false)}
          className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  );
}

// Loading State Component
export const PageLoadingState = ({ isLoading, children }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/80 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-gray-300">Loading...</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};