import React, { useEffect, useState } from "react";
import {
  FiMoon,
  FiSun,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

export default function Navbar({ dark: propDark, setDark: propSetDark }) {
  const { user, logout } = useAuth();

  const [localDark, setLocalDark] = useState(propDark ?? false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dark = propDark ?? localDark;
  const setDark = typeof propSetDark === "function" ? propSetDark : setLocalDark;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("predicto_theme");
      if (saved) setDark(saved === "dark");
    } catch {}
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    try {
      localStorage.setItem("predicto_theme", newDark ? "dark" : "light");
    } catch {}
  };

  const closeMobile = () => setIsMobileMenuOpen(false);

  const navItems = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Portfolio", "/portfolio"],
    ["Insights", "/insights"],
    ["Suggestions", "/suggestions"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ];

  return (
    <>
      {/* SUPER ULTRA PREMIUM NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          fixed top-0 left-0 right-0 z-50
          backdrop-blur-2xl
          bg-white/60 dark:bg-slate-900/60
          border-b border-white/20 dark:border-slate-700/40
          shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)]
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO SECTION */}
          <Link
            to="/"
            onClick={closeMobile}
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={{ rotate: 6, scale: 1.07 }}
              transition={{ type: "spring", stiffness: 180 }}
              className="
                w-10 h-10 rounded-xl
                bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400
                flex items-center justify-center text-white font-extrabold text-lg
                shadow-lg shadow-blue-500/30
              "
            >
              P
            </motion.div>

            <div>
              <motion.h1
                whileHover={{ x: 2 }}
                className="text-lg font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                Predicto
              </motion.h1>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                AI Estimation Suite
              </p>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map(([label, path], i) => (
              <motion.div
                key={path}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to={path}
                  className="
                    relative group py-1
                    text-gray-700 dark:text-gray-200
                    hover:text-blue-600 dark:hover:text-blue-400
                    transition-colors
                  "
                >
                  {label}

                  {/* PREMIUM UNDERLINE */}
                  <span
                    className="
                      absolute left-0 -bottom-1 h-[2px] w-0
                      bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400
                      rounded-full transition-all duration-300 group-hover:w-full
                    "
                  ></span>
                </Link>
              </motion.div>
            ))}

            {/* DASHBOARD */}
            {user && (
              <Link
                to="/dashboard"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            {/* SEARCH BUTTON */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsSearchOpen(true)}
              className="
                p-2 rounded-xl 
                hover:bg-gray-100 dark:hover:bg-slate-700
                transition-all shadow-sm
              "
            >
              <FiSearch className="w-5 h-5" />
            </motion.button>

            {/* THEME TOGGLE */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              onClick={toggleTheme}
              className="
                p-2 rounded-xl 
                hover:bg-gray-100 dark:hover:bg-slate-700 
                transition-all shadow-md
              "
            >
              {dark ? (
                <FiSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-blue-600" />
              )}
            </motion.button>

            {/* LOGIN / USER */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="
                    px-4 py-1 rounded-lg 
                    bg-red-500 text-white text-sm
                    hover:bg-red-600 
                    shadow-md transition-all
                  "
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="
                  hidden md:block px-4 py-2 rounded-lg 
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  text-white text-sm shadow-lg
                  hover:opacity-90 transition-all
                "
              >
                Login
              </Link>
            )}

            {/* MOBILE MENU BUTTON */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="
                md:hidden p-2 rounded-xl
                hover:bg-gray-100 dark:hover:bg-slate-700 
                transition-colors shadow-sm
              "
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            md:hidden fixed inset-0 top-[72px]
            bg-white dark:bg-slate-900
            border-t border-gray-200 dark:border-slate-700
            backdrop-blur-2xl shadow-xl z-40
          "
        >
          <div className="px-6 py-5 space-y-3 overflow-y-auto max-h-[calc(100vh-80px)]">
            {navItems.map(([label, path]) => (
              <Link
                key={path}
                to={path}
                onClick={closeMobile}
                className="
                  block text-gray-800 dark:text-gray-200 text-sm font-medium
                  py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors
                "
              >
                {label}
              </Link>
            ))}

            {/* LOGIN / USER */}
            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    closeMobile();
                  }}
                  className="
                    w-full px-4 py-2 rounded-lg
                    bg-red-500 text-white
                    hover:bg-red-600 transition
                  "
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="
                    w-full block text-center px-4 py-2 rounded-lg
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    text-white shadow-md hover:opacity-90
                  "
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* SEARCH MODAL */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
