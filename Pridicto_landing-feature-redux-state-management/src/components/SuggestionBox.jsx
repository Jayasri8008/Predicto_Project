import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, ThumbsUp, MessageCircle, Lightbulb, TrendingUp, Clock } from 'lucide-react';

const SuggestionBox = ({ context = 'general', maxSuggestions = 3, className = '', dismissible = true }) => {
  const dispatch = useDispatch();
  const { suggestions, loading } = useSelector((state) => state.suggestions);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [dismissed, setDismissed] = useState(false);
  const [dismissedItems, setDismissedItems] = useState(new Set());

  // Filter suggestions based on context
  const getContextualSuggestions = () => {
    if (!suggestions || suggestions.length === 0) return [];
    
    const filtered = suggestions.filter(suggestion => {
      if (dismissedItems.has(suggestion.id)) return false;
      
      // Context-based filtering
      switch (context) {
        case 'dashboard':
          return suggestion.category === 'Dashboard' || 
                 suggestion.category === 'Analytics' ||
                 suggestion.title.toLowerCase().includes('dashboard') ||
                 suggestion.title.toLowerCase().includes('analytics');
        case 'portfolio':
          return suggestion.category === 'Portfolio' ||
                 suggestion.title.toLowerCase().includes('portfolio') ||
                 suggestion.title.toLowerCase().includes('project');
        case 'insights':
          return suggestion.category === 'Insights' ||
                 suggestion.title.toLowerCase().includes('insight') ||
                 suggestion.title.toLowerCase().includes('data');
        case 'services':
          return suggestion.category === 'Services' ||
                 suggestion.title.toLowerCase().includes('service') ||
                 suggestion.title.toLowerCase().includes('feature');
        default:
          return true; // Show all for general context
      }
    });

    // Sort by votes and AI score
    return filtered
      .sort((a, b) => {
        const scoreA = (a.netVotes || 0) + (a.aiScore || 0);
        const scoreB = (b.netVotes || 0) + (b.aiScore || 0);
        return scoreB - scoreA;
      })
      .slice(0, maxSuggestions);
  };

  const contextualSuggestions = getContextualSuggestions();

  const handleDismiss = (suggestionId) => {
    setDismissedItems(prev => new Set([...prev, suggestionId]));
  };

  const handleDismissAll = () => {
    setDismissed(true);
  };

  if (!isAuthenticated || loading || dismissed || contextualSuggestions.length === 0) {
    return null;
  }

  const getContextIcon = () => {
    switch (context) {
      case 'dashboard': return <TrendingUp className="w-4 h-4" />;
      case 'portfolio': return <Lightbulb className="w-4 h-4" />;
      case 'insights': return <TrendingUp className="w-4 h-4" />;
      case 'services': return <Lightbulb className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getContextTitle = () => {
    switch (context) {
      case 'dashboard': return 'Dashboard Improvements';
      case 'portfolio': return 'Portfolio Enhancements';
      case 'insights': return 'Insights Features';
      case 'services': return 'Service Suggestions';
      default: return 'Community Suggestions';
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getContextIcon()}
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {getContextTitle()}
          </h3>
        </div>
        {dismissible && (
          <button
            onClick={handleDismissAll}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {contextualSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-start justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-md"
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                {suggestion.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                {suggestion.description}
              </p>
              <div className="flex items-center space-x-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{suggestion.netVotes || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{suggestion.commentCount || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(suggestion.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 ml-2">
              <button
                onClick={() => handleDismiss(suggestion.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
                title="Dismiss this suggestion"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
        <Link
          to="/suggestions"
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          View all suggestions →
        </Link>
      </div>
    </div>
  );
};

export default SuggestionBox;