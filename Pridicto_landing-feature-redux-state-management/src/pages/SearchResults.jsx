import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Clock, Tag } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';

// Searchable content database
const allContent = [
  // Pages
  { id: 1, type: 'page', title: 'Home', path: '/', description: 'Welcome to Predicto AI', tags: ['navigation', 'main'] },
  { id: 2, type: 'page', title: 'About Us', path: '/about', description: 'Learn about our mission and team', tags: ['company', 'team', 'navigation'] },
  { id: 3, type: 'page', title: 'Services', path: '/services', description: 'Our comprehensive service offerings', tags: ['services', 'navigation'] },
  { id: 4, type: 'page', title: 'Pricing', path: '/pricing', description: 'Transparent pricing for all plans', tags: ['pricing', 'plans', 'navigation'] },
  { id: 5, type: 'page', title: 'Blog', path: '/blog', description: 'Latest insights and industry trends', tags: ['blog', 'content', 'navigation'] },
  { id: 6, type: 'page', title: 'Case Studies', path: '/case-studies', description: 'Success stories from our clients', tags: ['cases', 'results', 'navigation'] },
  { id: 7, type: 'page', title: 'API Documentation', path: '/api-docs', description: 'Complete API reference and examples', tags: ['api', 'developers', 'technical'] },
  { id: 8, type: 'page', title: 'Contact', path: '/contact', description: 'Get in touch with our team', tags: ['contact', 'support', 'navigation'] },

  // Blog Posts
  {
    id: 101,
    type: 'blog',
    title: 'The Future of AI-Powered Project Estimation',
    path: '/blog/1',
    category: 'AI & Technology',
    description: 'Exploring how machine learning is revolutionizing project estimation accuracy and timelines',
    tags: ['ai', 'estimation', 'machine-learning', 'technology', 'future'],
    readTime: 5,
    date: '2024-01-20',
  },
  {
    id: 102,
    type: 'blog',
    title: 'Agile Estimation: Best Practices from 100+ Teams',
    path: '/blog/2',
    category: 'Agile & Management',
    description: 'Data-driven insights from agile teams on effective estimation techniques and common pitfalls',
    tags: ['agile', 'estimation', 'best-practices', 'teams', 'development'],
    readTime: 7,
    date: '2024-01-15',
  },

  // Case Studies
  {
    id: 201,
    type: 'case-study',
    title: 'TechStart: 60% Faster Project Planning',
    path: '/case-studies/1',
    category: 'SaaS',
    description: 'How TechStart reduced planning time and improved estimation accuracy dramatically',
    tags: ['saas', 'case-study', 'success', 'planning', 'improvement'],
    readTime: 4,
    date: '2024-01-10',
  },
  {
    id: 202,
    type: 'case-study',
    title: 'Digital Ventures: 3x ROI in 6 Months',
    path: '/case-studies/2',
    category: 'Digital Agency',
    description: 'Digital agency achieved 3x return on investment through better estimation and delivery',
    tags: ['agency', 'case-study', 'roi', 'success', 'delivery'],
    readTime: 4,
    date: '2024-01-05',
  },
];

const typeConfig = {
  page: { icon: '📄', label: 'Page', color: 'blue' },
  blog: { icon: '📝', label: 'Blog Post', color: 'purple' },
  'case-study': { icon: '📊', label: 'Case Study', color: 'green' },
  feature: { icon: '✨', label: 'Feature', color: 'pink' },
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const query = searchParams.get('q') || '';

  // SEO
  useEffect(() => {
    updateMetaTags({
      title: `Search Results for "${query}" | Predicto AI`,
      description: `Found ${results.length} results for your search query "${query}"`,
      url: window.location.href,
    });
  }, [query, results.length]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setFilteredResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const searchResults = allContent.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
      const tagsMatch = item.tags?.some(tag => tag.includes(searchTerm));
      const categoryMatch = item.category?.toLowerCase().includes(searchTerm);

      // Calculate relevance score
      let score = 0;
      if (item.title.toLowerCase() === searchTerm) score += 100;
      if (titleMatch) score += 50;
      if (categoryMatch) score += 30;
      if (tagsMatch) score += 20;
      if (descriptionMatch) score += 10;

      return (titleMatch || descriptionMatch || tagsMatch || categoryMatch) && score > 0;
    });

    // Add relevance score to results
    const resultsWithScore = searchResults.map(item => {
      const searchTerm = query.toLowerCase();
      let score = 0;
      if (item.title.toLowerCase() === searchTerm) score += 100;
      if (item.title.toLowerCase().includes(searchTerm)) score += 50;
      if (item.category?.toLowerCase().includes(searchTerm)) score += 30;
      if (item.tags?.some(tag => tag.includes(searchTerm))) score += 20;
      if (item.description.toLowerCase().includes(searchTerm)) score += 10;
      return { ...item, score };
    });

    setResults(resultsWithScore);
  }, [query]);

  // Filter and sort
  useEffect(() => {
    let filtered = results;

    if (selectedType !== 'all') {
      filtered = filtered.filter(r => r.type === selectedType);
    }

    if (sortBy === 'relevance') {
      filtered.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredResults(filtered);
  }, [results, selectedType, sortBy]);

  const types = ['all', ...new Set(results.map(r => r.type))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white from-gray-900 to-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-8 h-8 text-brand-500" />
            <h1 className="text-4xl font-bold text-gray-900 text-white">Search Results</h1>
          </div>
          <p className="text-lg text-gray-600 text-gray-400">
            Found <span className="font-semibold text-brand-500">{results.length}</span> results for{' '}
            <span className="font-semibold text-gray-900 text-white">"{query}"</span>
          </p>
        </motion.div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 border-gray-700 sticky top-4">
                <h3 className="font-semibold text-gray-900 text-white mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>

                {/* Type Filter */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 text-gray-300 mb-3">Content Type</p>
                  <div className="space-y-2">
                    {types.map(type => {
                      const count = type === 'all' ? results.length : results.filter(r => r.type === type).length;
                      const config = typeConfig[type] || { icon: '📄', label: 'Other' };
                      return (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedType === type
                              ? 'bg-brand-100 bg-brand-900/20 text-brand-900 text-brand-100 font-medium'
                              : 'text-gray-700 text-gray-300 hover:bg-gray-100 hover:bg-gray-700'
                          }`}
                        >
                          <span className="text-sm">
                            {config.icon} {type === 'all' ? 'All' : config.label} ({count})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 text-gray-300 mb-3">Sort By</p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 border-gray-600 bg-white bg-gray-700 text-gray-900 text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="date">Newest First</option>
                    <option value="title">A-Z Title</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 space-y-4"
            >
              {filteredResults.map((result, index) => {
                const config = typeConfig[result.type] || { icon: '📄', label: 'Content' };
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`${result.path}?from=search`}
                      className="group block bg-white bg-gray-800 rounded-xl p-6 border border-gray-200 border-gray-700 shadow-sm hover:shadow-md hover:shadow-xl transition-all hover:border-brand-500 hover:border-brand-400"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-2xl">{config.icon}</span>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 text-white group-hover:text-brand-500 group-hover:text-brand-400 transition-colors">
                              {result.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-block px-2 py-1 bg-gray-100 bg-gray-700 text-xs font-medium text-gray-700 text-gray-300 rounded">
                                {config.label}
                              </span>
                              {result.category && (
                                <span className="text-xs text-gray-500 text-gray-400">{result.category}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-500 transition-colors flex-shrink-0 mt-1" />
                      </div>

                      <p className="text-gray-600 text-gray-400 mb-4 line-clamp-2">
                        {result.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200 border-gray-700">
                        {result.readTime && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 text-gray-400">
                            <Clock className="w-3 h-3" />
                            {result.readTime} min read
                          </div>
                        )}
                        {result.date && (
                          <div className="text-xs text-gray-500 text-gray-400">
                            {new Date(result.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        )}
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500 text-gray-400">
                              {result.tags.slice(0, 2).join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search className="w-16 h-16 text-gray-300 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 text-white mb-2">
              {query ? `No results found for "${query}"` : 'Start searching'}
            </h3>
            <p className="text-gray-600 text-gray-400 mb-8">
              {query
                ? 'Try using different keywords or check the available pages'
                : 'Use the search bar to find content'}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              Go to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
