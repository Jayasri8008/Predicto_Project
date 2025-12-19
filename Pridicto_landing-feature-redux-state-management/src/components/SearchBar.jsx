import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const searchData = [
  { title: 'Business Plan Writing', path: '/services/1', category: 'Services' },
  { title: 'Pitch Deck Creation', path: '/services/2', category: 'Services' },
  { title: 'Financial Modelling', path: '/services/3', category: 'Services' },
  { title: 'Market Research & Feasibility', path: '/services/4', category: 'Services' },
  { title: 'Startup Consulting', path: '/services/5', category: 'Services' },
  { title: 'Recruitment & HR Support', path: '/services/6', category: 'Services' },
  { title: 'Construction Cost Estimation', path: '/services/7', category: 'Services' },
  { title: 'Material & Labor Estimation', path: '/services/8', category: 'Services' },
  { title: 'Budget Forecasting', path: '/services/9', category: 'Services' },
  { title: 'Feasibility Analysis', path: '/services/10', category: 'Services' },
  { title: 'About Us', path: '/about', category: 'Company' },
  { title: 'Our Portfolio', path: '/portfolio', category: 'Company' },
  { title: 'Insights & Blog', path: '/insights', category: 'Company' },
  { title: 'Global Presence', path: '/global-presence', category: 'Company' },
  { title: 'Contact Us', path: '/contact', category: 'Company' },
  { title: 'FAQ', path: '/faq', category: 'Support' },
  { title: 'Project Estimation', path: '/estimate', category: 'Tools' },
  { title: 'Dashboard', path: '/dashboard', category: 'Tools' },
  { title: 'Comparison Tool', path: '/comparison', category: 'Tools' },
];

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  const handleSelect = (path) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for services, pages, or features..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelect(result.path)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-100 dark:border-slate-600 last:border-b-0 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {result.title}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {result.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
