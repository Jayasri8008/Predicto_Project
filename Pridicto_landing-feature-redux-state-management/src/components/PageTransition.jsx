import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
    y: 0,
    scale: 0.98
  },
  in: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: 20,
    y: 0,
    scale: 1.02
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

export default function PageTransition({ children, className = '', loadingMessage = "Loading..." }) {
  const location = useLocation();

  return (
    <div className={`min-h-screen ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full h-full"
        >
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <LoadingSpinner size="lg" message={loadingMessage} />
            </div>
          }>
            {children}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}