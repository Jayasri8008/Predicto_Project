import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    'services': 'Services',
    'portfolio': 'Portfolio',
    'insights': 'Insights',
    'global-presence': 'Global Presence',
    'about': 'About',
    'contact': 'Contact',
    'estimate': 'Estimation',
    'dashboard': 'Dashboard',
    'comparison': 'Comparison',
    'login': 'Login',
    'signup': 'Signup',
    'admin': 'Admin Panel',
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link
        to="/"
        className="flex items-center hover:text-indigo-600 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

        return (
          <React.Fragment key={pathname}>
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-indigo-600 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
