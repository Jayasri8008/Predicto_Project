import React, { createContext, useContext } from 'react';
import { motion } from 'framer-motion';

const AnimationContext = createContext();

export const useRouteAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useRouteAnimation must be used within a RouteAnimationProvider');
  }
  return context;
};

const routeAnimations = {
  '/': {
    container: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    content: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.2 }
    }
  },
  '/about': {
    container: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 30 }
    },
    content: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: 0.15 }
    }
  },
  '/services': {
    container: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 }
    },
    content: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  },
  '/dashboard': {
    container: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -30 }
    },
    content: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.1, staggerChildren: 0.05 }
    }
  },
  '/contact': {
    container: {
      initial: { opacity: 0, rotateY: -15 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: 15 }
    },
    content: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.2 }
    }
  },
  '/portfolio': {
    container: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -30 }
    },
    content: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: 0.15 }
    }
  },
  'default': {
    container: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    content: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }
  }
};

export function RouteAnimationProvider({ children }) {
  const getRouteAnimation = (pathname) => {
    // Try exact match first
    if (routeAnimations[pathname]) {
      return routeAnimations[pathname];
    }
    
    // Try partial matches for nested routes
    for (const [route, animation] of Object.entries(routeAnimations)) {
      if (route !== 'default' && pathname.startsWith(route)) {
        return animation;
      }
    }
    
    return routeAnimations.default;
  };

  const value = {
    getRouteAnimation
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export const RouteAnimationWrapper = ({ children, className = '' }) => {
  const { getRouteAnimation } = useRouteAnimation();
  const pathname = window.location.pathname;
  const animation = getRouteAnimation(pathname);

  return (
    <motion.div
      initial={animation.container.initial}
      animate={animation.container.animate}
      exit={animation.container.exit}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={className}
    >
      <motion.div
        initial={animation.content.initial}
        animate={animation.content.animate}
        transition={animation.content.transition || { duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInUp = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideInLeft = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideInRight = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};