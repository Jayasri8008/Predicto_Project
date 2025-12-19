import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const routeNames = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/services/:id': 'Service Detail',
  '/portfolio': 'Portfolio',
  '/insights': 'Insights',
  '/global-presence': 'Global Presence',
  '/contact': 'Contact',
  '/estimate': 'Quick Estimate',
  '/advanced-estimation': 'Advanced Estimation',
  '/estimation-analytics': 'Estimation Analytics',
  '/dashboard': 'Dashboard',
  '/dashboard/profile': 'Profile',
  '/dashboard/projects': 'Projects',
  '/dashboard/billing': 'Billing',
  '/dashboard/settings': 'Settings',
  '/comparison': 'Comparison',
  '/login': 'Login',
  '/signup': 'Signup',
  '/forgot-password': 'Forgot Password',
  '/admin': 'Admin Panel',
  '/faq': 'FAQ',
  '/features': 'Features',
  '/blog': 'Blog',
  '/case-studies': 'Case Studies',
  '/case-studies/:id': 'Case Study Detail',
  '/pricing': 'Pricing',
  '/privacy': 'Privacy',
  '/terms': 'Terms',
  '/cookies': 'Cookie Policy',
  '/blog/:id': 'Blog Post',
  '/api-docs': 'API Documentation',
  '/search': 'Search Results',
};

export default function BreadcrumbNavigation({ className = '' }) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
  // Skip breadcrumb for home page
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    const segmentName = routeNames[path] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    return { path, name: segmentName, isLast };
  });

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/80 bg-slate-800/80 backdrop-blur-sm border-b border-gray-200/50 border-slate-700/50 ${className}`}
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="flex items-center text-gray-500 hover:text-indigo-600 text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              aria-label="Home"
            >
              <FiHome className="w-4 h-4" />
            </Link>
          </li>
          
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              <FiChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              {crumb.isLast ? (
                <span className="text-gray-900 text-gray-100 font-medium">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-gray-500 hover:text-indigo-600 text-gray-400 hover:text-indigo-400 transition-colors duration-200 hover:underline"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </motion.nav>
  );
}