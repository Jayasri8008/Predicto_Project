import React, { useState, useEffect } from 'react';
import {
  FiMoon,
  FiSun,
  FiSearch,
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiBriefcase,
  FiFolder,
  FiTrendingUp,
  FiHelpCircle,
  FiMail,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

export default function VerticalNavbar({
  dark: propDark,
  setDark: propSetDark,
  isCollapsed,
  setIsCollapsed,
}) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [localDark, setLocalDark] = useState(propDark ?? false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('predicto_theme');
      if (saved) {
        const isDark = saved === 'dark';
        if (typeof propSetDark === 'function') {
          propSetDark(isDark);
        } else {
          setLocalDark(isDark);
        }
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dark = propDark ?? localDark;
  const setDark = typeof propSetDark === 'function' ? propSetDark : setLocalDark;

  const toggleTheme = () => {
    const newDark = !dark;
    try {
      localStorage.setItem('predicto_theme', newDark ? 'dark' : 'light');
    } catch (e) {
      /* ignore */
    }
    setDark(newDark);
  };

  const navItems = [
    { to: '/', label: 'Home', icon: FiHome },
    { to: '/about', label: 'About', icon: FiInfo },
    { to: '/services', label: 'Services', icon: FiBriefcase },
    { to: '/estimate', label: 'Estimate', icon: FiTrendingUp },
    { to: '/portfolio', label: 'Portfolio', icon: FiFolder },
    { to: '/insights', label: 'Insights', icon: FiTrendingUp },
    { to: '/global-presence', label: 'Global', icon: FiTrendingUp },
    { to: '/faq', label: 'FAQ', icon: FiHelpCircle },
    { to: '/contact', label: 'Contact', icon: FiMail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* BACKGROUND GLOW STRIP BEHIND SIDEBAR */}
      <div className="pointer-events-none fixed inset-y-0 left-0 w-40 -z-10">
        <div className="absolute inset-y-10 left-[-80px] w-[220px] rounded-full bg-gradient-to-b from-indigo-400/30 via-purple-400/20 to-teal-300/20 blur-3xl" />
      </div>

      <nav
        className={`fixed top-0 left-0 h-full z-40 transition-[width,background,color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          isCollapsed ? 'w-16' : 'w-68 max-w-[272px]'
        } bg-white/90 dark:bg-slate-950/90 border-r border-gray-200/60 dark:border-slate-800/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.45)]`}
      >
        {/* INNER BORDER GRADIENT FRAME */}
        <div className="relative h-full">
          <div className="pointer-events-none absolute inset-0 rounded-r-3xl border border-white/40 dark:border-white/10 opacity-60" />
          <div className="pointer-events-none absolute inset-y-0 right-[-1px] w-px bg-gradient-to-b from-indigo-400 via-purple-400 to-teal-300 opacity-80" />

          <div className="relative flex flex-col h-full">
            {/* ========== HEADER / LOGO ========== */}
            <div className="px-3 pt-4 pb-3 border-b border-gray-200/60 dark:border-slate-800/70">
              <div className="flex items-center justify-between">
                {!isCollapsed && (
                  <Link
                    to="/"
                    className="flex items-center gap-3 group"
                    title="Predicto"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-xl shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
                        P
                      </div>
                      {/* rotating gradient ring */}
                      <div className="pointer-events-none absolute inset-[-3px] rounded-3xl bg-[conic-gradient(at_50%_50%,rgba(59,130,246,0.2),transparent,rgba(16,185,129,0.25),transparent)] opacity-0 group-hover:opacity-100 animate-[spin_8s_linear_infinite] blur-[1px]" />
                    </div>
                    <div className="overflow-hidden">
                      <h1 className="font-semibold text-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                        Predicto
                      </h1>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        AI estimation studio
                      </p>
                    </div>
                  </Link>
                )}

                {/* Collapse button */}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="relative inline-flex items-center justify-center w-9 h-9 rounded-2xl border border-gray-200/70 dark:border-slate-700 bg-white/60 dark:bg-slate-900/80 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white shadow-sm hover:shadow-indigo-500/40 transition-all duration-300 group"
                  aria-label="Toggle sidebar"
                >
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {isCollapsed ? (
                    <FiMenu className="relative w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  ) : (
                    <FiX className="relative w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                  )}
                </button>
              </div>
            </div>

            {/* ========== NAV LINKS ========== */}
            <div className="flex-1 py-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300/70 dark:scrollbar-thumb-indigo-500/70 scrollbar-track-transparent">
              {navItems.map(({ to, label, icon: Icon }) => {
                const active = isActive(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`relative group mx-2 ${
                      isCollapsed ? 'justify-center' : ''
                    } flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-300`}
                    title={isCollapsed ? label : ''}
                  >
                    {/* Active neon bar on left */}
                    <div
                      className={`absolute left-2 top-1/2 -translate-y-1/2 h-8 w-[3px] rounded-full bg-gradient-to-b from-indigo-400 to-teal-300 transition-all duration-300 ${
                        active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                    />

                    {/* Spotlight background */}
                    <div
                      className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        active
                          ? 'bg-gradient-to-r from-indigo-500/12 via-purple-500/10 to-teal-400/10 border border-indigo-300/60 dark:border-indigo-500/70 shadow-[0_0_25px_rgba(79,70,229,0.35)]'
                          : 'border border-transparent hover:border-indigo-100/70 dark:hover:border-slate-600/80 hover:bg-slate-50/80 dark:hover:bg-slate-900/90'
                      }`}
                    />

                    {/* Icon */}
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-gray-100/80 dark:border-slate-700 group-hover:border-indigo-300/80 dark:group-hover:border-indigo-500/60 shadow-sm group-hover:shadow-md group-hover:shadow-indigo-500/20 transition-all duration-300">
                      <Icon
                        className={`w-4.5 h-4.5 transition-all duration-300 ${
                          active
                            ? 'text-indigo-600 dark:text-indigo-300'
                            : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 group-hover:-rotate-6'
                        }`}
                      />
                    </div>

                    {/* Label */}
                    {!isCollapsed && (
                      <span
                        className={`relative text-sm font-medium transition-all duration-300 ${
                          active
                            ? 'text-slate-900 dark:text-slate-50'
                            : 'text-gray-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-slate-50'
                        } group-hover:translate-x-0.5`}
                      >
                        {label}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Dashboard link (only when logged in) */}
              {user && (
                <Link
                  to="/dashboard"
                  className={`relative group mx-2 ${
                    isCollapsed ? 'justify-center' : ''
                  } flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-300`}
                  title={isCollapsed ? 'Dashboard' : ''}
                >
                  <div
                    className={`absolute left-2 top-1/2 -translate-y-1/2 h-8 w-[3px] rounded-full bg-gradient-to-b from-indigo-400 to-teal-300 transition-all duration-300 ${
                      isActive('/dashboard') ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      isActive('/dashboard')
                        ? 'bg-gradient-to-r from-indigo-500/12 via-purple-500/10 to-teal-400/10 border border-indigo-300/60 dark:border-indigo-500/70 shadow-[0_0_25px_rgba(79,70,229,0.35)]'
                        : 'border border-transparent hover:border-indigo-100/70 dark:hover:border-slate-600/80 hover:bg-slate-50/80 dark:hover:bg-slate-900/90'
                    }`}
                  />
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-gray-100/80 dark:border-slate-700 group-hover:border-indigo-300/80 dark:group-hover:border-indigo-500/60 shadow-sm group-hover:shadow-md group-hover:shadow-indigo-500/20 transition-all duration-300">
                    <FiUser
                      className={`w-4.5 h-4.5 transition-all duration-300 ${
                        isActive('/dashboard')
                          ? 'text-indigo-600 dark:text-indigo-300'
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 group-hover:-rotate-6'
                      }`}
                    />
                  </div>
                  {!isCollapsed && (
                    <span
                      className={`relative text-sm font-medium transition-all duration-300 ${
                        isActive('/dashboard')
                          ? 'text-slate-900 dark:text-slate-50'
                          : 'text-gray-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-slate-50'
                      } group-hover:translate-x-0.5`}
                    >
                      Dashboard
                    </span>
                  )}
                </Link>
              )}
            </div>

            {/* ========== BOTTOM ACTIONS ========== */}
            <div className="px-3 pb-4 pt-3 border-t border-gray-200/60 dark:border-slate-800/70 space-y-3 bg-gradient-to-t from-slate-50/80 via-white/60 to-transparent dark:from-slate-950/90 dark:via-slate-900/80">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`group relative mx-1 flex items-center gap-3 px-3 py-2.5 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                aria-label="Open search"
                title={isCollapsed ? 'Search' : ''}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FiSearch className="relative w-4.5 h-4.5 flex-shrink-0 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-all duration-300 group-hover:-rotate-6" />
                {!isCollapsed && (
                  <div className="relative flex-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      Search
                    </span>
                    <span className="hidden xl:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg border border-gray-200/80 dark:border-slate-600 text-[10px] text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-slate-900/80">
                      ⌘K
                    </span>
                  </div>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`group relative mx-1 flex items-center gap-3 px-3 py-2.5 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                aria-label="Toggle theme"
                title={isCollapsed ? 'Toggle theme' : ''}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                {dark ? (
                  <FiSun className="relative w-4.5 h-4.5 flex-shrink-0 text-amber-400 group-hover:text-amber-300 transition-all duration-300 group-hover:rotate-6" />
                ) : (
                  <FiMoon className="relative w-4.5 h-4.5 flex-shrink-0 text-blue-500 group-hover:text-blue-400 transition-all duration-300 group-hover:-rotate-6" />
                )}
                {!isCollapsed && (
                  <span className="relative text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    Theme
                  </span>
                )}
              </button>

              {/* User / Login */}
              {user ? (
                <div className="space-y-2">
                  {!isCollapsed && (
                    <div className="mx-1 px-3 py-2 rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border border-gray-200/70 dark:border-slate-700/80 text-[11px] text-gray-600 dark:text-gray-300 truncate">
                      {user.email}
                    </div>
                  )}
                  <button
                    onClick={logout}
                    className={`group relative mx-1 flex items-center gap-3 px-3 py-2.5 rounded-2xl overflow-hidden text-red-600 dark:text-red-400 transition-all duration-300 ${
                      isCollapsed ? 'justify-center' : ''
                    }`}
                    title={isCollapsed ? 'Logout' : ''}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <FiLogOut className="relative w-4.5 h-4.5 flex-shrink-0 group-hover:-rotate-6 transition-transform duration-300" />
                    {!isCollapsed && (
                      <span className="relative text-sm font-medium">
                        Logout
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`group relative mx-1 flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 ${
                    isCollapsed ? 'justify-center' : ''
                  }`}
                  title={isCollapsed ? 'Login' : ''}
                >
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.35),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <FiUser className="relative w-4.5 h-4.5 flex-shrink-0 group-hover:-rotate-6 transition-transform duration-300" />
                  {!isCollapsed && (
                    <span className="relative text-sm font-semibold tracking-wide">
                      Login
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
